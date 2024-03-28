import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GetUserRt, GetUserId, Public } from '../common/decorators';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AtGuard, RtGuard } from '../common/guards';
import { AuthLoginInput, AuthSignupInput } from './dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation('signup')
  async signup(@Args('dto') authSignupInput: AuthSignupInput) {
    return this.authService.signup(authSignupInput);
  }

  @Public()
  @Mutation('login')
  async login(@Args('dto') authLoginInput: AuthLoginInput) {
    return this.authService.login(authLoginInput);
  }

  @Mutation('logout')
  @UseGuards(AtGuard)
  async logout(@GetUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Mutation('refresh')
  @UseGuards(RtGuard)
  async refreshTokens(
    @GetUserId() userId: number,
    @GetUserRt() refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
