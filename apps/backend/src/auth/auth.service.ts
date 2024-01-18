import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, AuthLoginDto } from './dto';
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

    // removed because re-hash
    await this.updateRtHash(newUser.id, tokens.refresh_token);

    return tokens;
  }

  async login(dto: AuthLoginDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) throw new ForbiddenException('Username does not exist.');

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.password_hash,
    );

    if (!passwordMatches)
      throw new ForbiddenException('Password does not exist.');

    const tokens = await this.getTokens(user.id, user.username, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refresh_token: {
          not: null,
        },
      },
      data: {
        refresh_token: null,
      },
    });
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied!');

    const rtMatches = await bcrypt.compare(rt, user.refresh_token);

    if (!rtMatches) throw new ForbiddenException('Access Denied!');

    const tokens = await this.getTokens(user.id, user.username, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: hash,
      },
    });
  }

  async hashData(data: string) {
    const hash = await bcrypt.hash(data, 10);
    return hash;
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
