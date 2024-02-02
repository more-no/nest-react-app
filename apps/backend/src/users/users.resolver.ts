import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
  Body,
  Delete,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SharpPipe } from 'src/common/utils/sharp.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { AtGuard } from 'src/common/guards';
import { RolesGuard } from 'src/common/guards/role.guard';
import { RolesEnum } from '@prisma/client';
import { Roles } from 'src/common/decorators';
import { UpdateUserInput } from 'src/graphql';
import { TokenInterceptor } from 'src/common/interceptors/token.interceptor';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('upload')
  // @UseGuards(AtGuard, RolesGuard)
  // @Roles(RolesEnum.User)
  // @UseInterceptors(FileInterceptor('image'))
  async upload(
    @Args('id') userId: string,
    @UploadedFile(SharpPipe) filename: string,
  ) {
    const result = await this.usersService.upload(+userId, filename);
    return [userId, filename];
  }

  @Mutation('update')
  // @UseGuards(AtGuard, RolesGuard)
  // @Roles(RolesEnum.User, RolesEnum.Editor)
  async update(@Args('id') id: string, @Args('dto') dto: UpdateUserInput) {
    const updatedInfo = await this.usersService.update(+id, dto);
    return {
      username: updatedInfo.username,
      fullname: updatedInfo.fullname,
      bio: updatedInfo.bio,
    };
  }

  @Mutation('remove')
  // @UseGuards(AtGuard, RolesGuard)
  // @Roles(RolesEnum.User)
  @UseInterceptors(TokenInterceptor)
  async userRemove(@Context() context, @Args('id') id: string) {
    const accessToken = context.token;
    const isDeleted = await this.usersService.userRemove(+id, accessToken);

    if (isDeleted) {
      return true;
    } else {
      // Handle the case where userRemove failed (e.g., user not found, unauthorized)
      throw new Error('Failed to remove user.');
    }
  }

  // Admin endpoints

  @Mutation('adminRemove')
  // @UseGuards(AtGuard, RolesGuard)
  // @Roles(RolesEnum.Admin)
  async adminRemove(@Args('id') id: string) {
    return await this.usersService.adminRemove(+id);
  }

  @Mutation('role')
  // @UseGuards(AtGuard, RolesGuard)
  // @Roles(RolesEnum.Admin)
  async updateRole(@Args('id') id: string, @Body('roleId') roleId: number) {
    return await this.usersService.updateRole(+id, +roleId);
  }
}
