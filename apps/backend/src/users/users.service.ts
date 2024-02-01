import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserInput, UploadResultInput } from 'src/graphql';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update user info
  async update(id: number, dto: UpdateUserInput) {
    console.log('DTO: ', dto);
    try {
      const userUpdated = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username: dto.username,
          fullname: dto.fullname,
          bio: dto.bio,
        },
      });

      if (!userUpdated) {
        throw new BadRequestException('Could not update');
      }

      return {
        username: userUpdated.username,
        fullname: userUpdated.fullname,
        bio: userUpdated.bio,
      };
    } catch (error) {
      throw new NotFoundException(`Failed to update user: ${error.message}`);
    }
  }

  // upload user picture
  async upload(userId: number, pictureUrl: string): Promise<UploadResultInput> {
    try {
      const userUpdated = await this.prisma.user.update({
        where: { id: userId },
        data: { picture_url: pictureUrl },
      });

      if (!userUpdated) {
        throw new BadRequestException('Could not upload');
      }

      return { userId, filename: pictureUrl };
    } catch (error) {
      throw new NotFoundException(`Failed to upload: ${error.message}`);
    }
  }

  // delete authenticated user and session
  async userRemove(userId: number, request: any): Promise<number> {
    try {
      const session = await this.prisma.session.findFirst({
        where: {
          user_id: userId,
        },
      });

      if (!session) {
        throw new NotFoundException('Session not found');
      }

      if (session.token === request.token) {
        const token = await this.jwtService.decode(request.token);

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

        return userId;
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete: ${error.message}`,
      );
    }
  }

  // delete user by admin
  async adminRemove(userId: number): Promise<number> {
    try {
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
    } catch (error) {
      throw new NotFoundException(`Failed to find the user: ${error.message}`);
    }
  }

  // change user role by admin
  async updateRole(userId: number, roleId: number): Promise<number> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update the role: ${error.message}`,
      );
    }
  }
}
