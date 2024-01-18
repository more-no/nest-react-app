import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthLoginDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  // qui definisco le route per il login/signup
  // dopo posso utilizare questi metodi in auth.service

  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Post('/login')
  login(@Body() dto: AuthLoginDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @Post('/refresh')
  refreshTokens() {
    return this.authService.refreshTokens();
  }
}
