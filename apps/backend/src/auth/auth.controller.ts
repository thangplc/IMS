import { Controller, Post, Body, Get, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { Role } from '@prisma/client';
import { parseExpirationToMs } from '../common/utils';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginDto);

    // Get JWT expiration from config and convert to milliseconds
    const jwtExpiration = this.configService.get('JWT_EXPIRATION') || '24h';
    const maxAge = parseExpirationToMs(jwtExpiration);

    // Set HTTP-only cookie for token (maxAge matches JWT expiration)
    response.cookie('auth_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge, // Automatically synced with JWT_EXPIRATION
      path: '/',
    });

    // Return user data only (not token)
    return {
      user: result.user,
    };
  }

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register new user (Admin only)' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user info' })
  async getMe(@CurrentUser() user: any) {
    return user;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout and clear cookie' })
  async logout(@Res({ passthrough: true }) response: Response) {
    // Clear the auth cookie
    response.clearCookie('auth_token', {
      path: '/',
    });

    return {
      message: 'Logged out successfully',
    };
  }
}
