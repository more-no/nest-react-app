import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UpdateUserInput } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        user_role: {
          select: {
            role: {
              select: {
                role_name: true,
              },
            },
          },
        },
      },
    });

    if (!users) throw new ForbiddenException('Error retrieving the Users.');

    return users;
  }

  async getUserById(id: number, accessToken: string): Promise<User> {
    const token = await this.jwtService.decode(accessToken);

    if (id === token.sub) {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: {
          post: true,
          group_post: {
            include: {
              group_post: true,
            },
          },
        },
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  // update user info
  async update(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<UpdateUserInput> {
    try {
      const userUpdated = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username: updateUserInput.username,
          fullname: updateUserInput.fullname,
          bio: updateUserInput.bio,
        },
      });

      return {
        username: userUpdated.username,
        fullname: userUpdated.fullname,
        bio: userUpdated.bio,
      };
    } catch (error) {
      throw new NotFoundException(`Failed to update user: ${error.message}`);
    }
  }

  // delete authenticated user and session
  async userRemove(userId: number, accessToken: string): Promise<boolean> {
    const session = await this.prisma.session.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.token === accessToken) {
      const token = await this.jwtService.decode(accessToken);

      const userDeleted = await this.prisma.user.deleteMany({
        where: { id: token.sub },
      });

      if (!userDeleted) {
        throw new InternalServerErrorException('Could not delete the User');
      }

      const deletedSession = await this.prisma.session.deleteMany({
        where: { user_id: userId },
      });

      if (!deletedSession) {
        throw new InternalServerErrorException('Error during deletion');
      }

      return true;
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  // delete user by admin
  async adminRemoveUser(userId: number): Promise<number> {
    const userToDelete = await this.prisma.user.delete({
      where: { id: userId },
    });

    if (!userToDelete) {
      throw new BadRequestException('Could not delete the User');
    }

    const deletedSession = await this.prisma.session.deleteMany({
      where: { user_id: userId },
    });

    if (!deletedSession) {
      throw new InternalServerErrorException('Error during deletion');
    }

    return userId;
  }

  // change user role by admin
  async updateRole(userId: number, roleId: number): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { user_role: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userRoleUpdated = await this.prisma.userRole.update({
      where: {
        user_id_role_id: {
          user_id: user.id,
          role_id: user.user_role[0].role_id,
        },
      },
      data: {
        role: { connect: { id: roleId } },
      },
    });

    if (!userRoleUpdated) {
      throw new NotFoundException('User not found');
    }

    return roleId;
  }
}
