import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AtGuard, RtGuard } from 'src/common/guards';
import {
  Public,
  GetCurrentUser,
  GetCurrentUserId,
} from 'src/common/decorators';
import { AuthDto, AuthLoginDto } from './dto/auth.dto';
import { Tokens } from 'src/graphql';

@Controller('auth')
export class AuthController {
  // qui definisco le route per il login/signup
  // dopo posso utilizare questi metodi in auth.service

  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED) // here we select the status code to return
  signup(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK) // here we select the status code to return
  login(@Body() dto: AuthLoginDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Public()
  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
