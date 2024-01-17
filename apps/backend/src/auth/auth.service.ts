import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
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

  async signup(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    console.log('Hash: ', hash);

    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password_hash: hash,
      },
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.username,
      newUser.email,
    );

    await this.updateRtHash(newUser.id, tokens.refresh_token);

    return tokens;
  }

  login() {}

  logout() {}

  refreshTokens() {}

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password_hash: hash,
      },
    });
  }

  hashData(data: string) {
    console.log('Data to be hashed:', data);
    return bcrypt.hash(data, 10);
  }

  async getTokens(
    userId: number,
    username: string,
    email: string,
    /*role: string,
    iat (Issued At Timestamp): number
    expiryTimeStamp: date? number?*/
  ) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        // verification accessToken
        { sub: userId, username, email },
        { secret: 'AT_SECRET', expiresIn: 60 * 15 },
      ),
      this.jwtService.signAsync(
        // verification refreshToken
        { sub: userId, username, email },
        { secret: 'RT_SECRET', expiresIn: 60 * 60 * 24 },
      ),
    ]);

    return { access_token: at, refresh_token: rt };
  }
}
