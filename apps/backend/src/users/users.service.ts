import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUser, User, UserWithoutPassword } from './types/user.type';
import { DatabaseService } from '../database/database.service';

const USER_COLUMNS = `id, first_name AS "firstName", last_name AS "lastName", email`;

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.databaseService.query<User>(
      `SELECT ${USER_COLUMNS}, password FROM users WHERE email = $1`,
      [email.trim().toLowerCase()],
    );

    const row: unknown = result.rows[0];
    return row ? (row as User) : undefined;
  }

  async createUser(data: CreateUser): Promise<UserWithoutPassword> {
    const result = await this.databaseService.query<UserWithoutPassword>(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES ($1, $2, $3, $4)
       RETURNING ${USER_COLUMNS}`,
      [
        data.firstName.trim().toUpperCase(),
        data.lastName.trim().toUpperCase(),
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
      `SELECT ${USER_COLUMNS} FROM users WHERE id = $1`,
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
}
