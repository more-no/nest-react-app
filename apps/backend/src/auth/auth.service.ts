import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthLoginInput, AuthSignupInput, Tokens } from 'src/graphql';
import { getTokens, updateRtHash } from 'src/common/utils';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthSignupInput) {
    const hash = await bcrypt.hash(dto.password, 10);

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: dto.username }, { email: dto.email }],
      },
    });

    if (existingUser) {
      throw new ForbiddenException('Username or email already exists.');
    }

    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password_hash: hash,
        user_role: {
          create: {
            role: {
              connect: {
                id: 3,
              },
            },
          },
        },
      },
      include: {
        user_role: true,
      },
    });

    if (!newUser) {
      throw new InternalServerErrorException('Error creating the user');
    }

    const tokens = await getTokens(
      newUser.id,
      newUser.username,
      newUser.email,
      newUser.user_role[0].role_id,
    );

    // Create a session for the new user
    const session = await this.prisma.session.create({
      data: {
        token: tokens.access_token,
        user_id: newUser.id,
      },
    });

    if (!session) {
      throw new InternalServerErrorException('Error creating the session');
    }

    await updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async login(dto: AuthLoginInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
      include: {
        user_role: true,
      },
    });

    if (!user) throw new ForbiddenException('Invalid username or password.');

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.password_hash,
    );

    if (!passwordMatches) {
      throw new ForbiddenException('Invalid username or password.');
    }

    const tokens = await getTokens(
      user.id,
      user.username,
      user.email,
      user.user_role[0].role_id,
    );

    // Check if user session exists, if not create a new one
    const existingSession = await this.prisma.session.findFirst({
      where: { user_id: user.id },
    });

    if (existingSession) {
      await updateRtHash(user.id, tokens.refresh_token);
      return tokens;
    }

    if (!existingSession) {
      const newSession = await this.prisma.session.create({
        data: {
          user_id: user.id,
          token: tokens.access_token,
        },
      });

      if (!newSession) {
        throw new InternalServerErrorException('Error creating the session');
      }
    }

    await updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    const userLoggedOut = await this.prisma.user.updateMany({
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

    if (!userLoggedOut) {
      throw new InternalServerErrorException('Error during logout');
    }

    const deletedSession = await this.prisma.session.deleteMany({
      where: { user_id: userId },
    });

    if (!deletedSession) {
      throw new InternalServerErrorException('Error during logout');
    }

    return true;
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        user_role: true,
      },
    });

    if (!user || !user.refresh_token)
      throw new ForbiddenException('User does not exist!');

    const rtMatches = await bcrypt.compare(rt, user.refresh_token);

    if (!rtMatches) {
      throw new ForbiddenException('Invalid token.');
    }

    const tokens = await getTokens(
      user.id,
      user.username,
      user.email,
      user.user_role[0].role_id,
    );

    await updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
}
