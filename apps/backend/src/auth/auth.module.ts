import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from 'src/common/strategies/at-strategy';
import { RtStrategy } from 'src/common/strategies/rt-strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AuthResolver, AtStrategy, RtStrategy],
})
export class AuthModule {}
