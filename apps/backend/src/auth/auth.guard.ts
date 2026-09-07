import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import type { AuthRequest } from './types/auth-request.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const sessionId = request.cookies.sessionId;
    if (!sessionId) {
      throw new UnauthorizedException('Unauthorized');
    }
    const userId = await this.redisService.get(`session:${sessionId}`);
    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    request.userId = Number(userId);
    return true;
  }
}
