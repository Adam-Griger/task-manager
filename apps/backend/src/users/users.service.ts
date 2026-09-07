import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUser, User, UserWithoutPassword } from './types/user.type';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByUsername(username: string): Promise<User | undefined> {
    const result = await this.databaseService.query<User>(
      `SELECT id, username, password FROM users WHERE username = $1`,
      [username.trim().toLowerCase()],
    );

    const row: unknown = result.rows[0];
    return row ? (row as User) : undefined;
  }

  async createUser(data: CreateUser): Promise<UserWithoutPassword> {
    const result = await this.databaseService.query<UserWithoutPassword>(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, username`,
      [
        data.username.trim().toLowerCase(),
        data.email.trim().toLowerCase(),
        data.password,
      ],
    );

    const row: unknown = result.rows[0];
    if (!row) {
      throw new Error('Failed to create user');
    }

    return row as UserWithoutPassword;
  }

  async findById(id: number): Promise<UserWithoutPassword | undefined> {
    const result = await this.databaseService.query<UserWithoutPassword>(
      `SELECT id, username FROM users WHERE id = $1`,
      [id],
    );

    const row: unknown = result.rows[0];
    if (!row) {
      return undefined;
    }

    return row as UserWithoutPassword;
  }

  async getCurrentUser(userId: number): Promise<UserWithoutPassword> {
    const user = await this.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }

  async emailExists(email: string): Promise<boolean> {
    const result = await this.databaseService.query<{ exists: boolean }>(
      `SELECT EXISTS (
         SELECT 1 FROM users WHERE email = $1
       ) AS exists`,
      [email.trim().toLowerCase()],
    );

    return result.rows[0].exists;
  }

  async usernameExists(username: string): Promise<boolean> {
    const result = await this.databaseService.query<{ exists: boolean }>(
      `SELECT EXISTS (
         SELECT 1 FROM users WHERE username = $1
       ) AS exists`,
      [username.trim().toLowerCase()],
    );

    return result.rows[0].exists;
  }
}
