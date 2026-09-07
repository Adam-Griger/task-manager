import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import type { AuthRequest } from './types/auth-request.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, sessionId } = await this.authService.login(data);

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: false, // TODO: change to true in production
      maxAge: 60 * 60 * 4 * 1000,
      sameSite: 'lax',
    });

    return user;
  }

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(req.cookies.sessionId!);

    res.clearCookie('sessionId', { secure: false, sameSite: 'lax' });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() req: AuthRequest) {
    return this.authService.getCurrentUser(req.userId!);
  }
}
