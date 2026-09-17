import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import type { UserWithoutPassword } from '../users/types/user.type';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import { RedisService } from '../redis/redis.service';
import { LoginDto } from './dto/login.dto';
import { LoginResult } from './types/login-result.type';

const DUMMY_BCRYPT_HASH =
  '$2b$12$TyWWAWdmq0iGajiE/2/ER.jDviEqsIangWE0KvysZ2iVHxqYfm2U.';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  async login(data: LoginDto): Promise<LoginResult> {
    const user = await this.usersService.findByEmail(data.email);

    const hashedPassword = user?.password ?? DUMMY_BCRYPT_HASH;

    const checkPassword = await bcrypt.compare(data.password, hashedPassword);
    if (!user || !checkPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const sessionId = randomBytes(32).toString('base64url');

    await this.redisService.set(
      `session:${sessionId}`,
      user.id.toString(),
      60 * 60 * 4,
    );

    const { password: _password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      sessionId,
    };
  }

  async register(data: RegisterDto): Promise<UserWithoutPassword> {
    const emailExists = await this.usersService.emailExists(data.email);
    if (emailExists) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    try {
      return await this.usersService.createUser({
        ...data,
        password: hashedPassword,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === '23505' &&
        'constraint' in error &&
        error.constraint === 'users_email_key'
      ) {
        throw new ConflictException('Email is already in use');
      }
      throw error;
    }
  }

  async logout(sessionId: string): Promise<void> {
    await this.redisService.delete(`session:${sessionId}`);
  }

  async getCurrentUser(userId: number): Promise<UserWithoutPassword> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
