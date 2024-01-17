import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    // config: ConfigService,
  ) {}

  hashData(data: string) {
    return bcrypt.hash(data, 12);
  }

  async getTokens(
    userId: number,
    username: string,
    /*role: string,
    iat (Issued At Timestamp): number
    expiryTimeStamp: date? number?*/
  ) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        // verification accessToken
        { sub: userId, username },
        { secret: 'AT_SECRET', expiresIn: 60 * 15 },
      ),
      this.jwtService.signAsync(
        // verification refreshToken
        { sub: userId, username },
        { secret: 'RT_SECRET', expiresIn: 60 * 60 * 24 },
      ),
    ]);

    return { access_token: at, refresh_token: rt };
  }

  async signup(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password_hash: hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.username);

    return tokens;
  }

  login() {}

  logout() {}

  refreshTokens() {}
}
