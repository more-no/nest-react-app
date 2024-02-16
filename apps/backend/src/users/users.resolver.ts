import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { AtGuard } from '../common/guards';
import { RolesGuard } from '../common/guards/role.guard';
import { RolesEnum } from '@prisma/client';
import { Roles } from '../common/decorators';
import { UpdateUserInput } from '../graphql';
import { TokenInterceptor } from '../common/interceptors/token.interceptor';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('update')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Editor)
  async update(@Args('id') id: string, @Args('dto') dto: UpdateUserInput) {
    const updatedInfo = await this.usersService.update(+id, dto);
    return {
      username: updatedInfo.username,
      fullname: updatedInfo.fullname,
      bio: updatedInfo.bio,
    };
  }

  @Mutation('remove')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.User)
  @UseInterceptors(TokenInterceptor)
  async userRemove(@Context() context, @Args('id') id: string) {
    const accessToken = context.token;
    const isDeleted = await this.usersService.userRemove(+id, accessToken);

    if (isDeleted) {
      return true;
    } else {
      throw new Error('Failed to remove user.');
    }
  }

  // Admin endpoints

  @Mutation('adminRemove')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.Admin)
  async adminRemove(@Args('id') id: string) {
    return await this.usersService.adminRemove(+id);
  }

  @Mutation('updateRole')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.Admin)
  async updateRole(@Args('id') id: string, @Args('roleId') roleId: string) {
    return await this.usersService.updateRole(+id, +roleId);
  }
}
