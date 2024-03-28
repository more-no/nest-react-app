import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { AtGuard } from '../common/guards';
import { RolesGuard } from '../common/guards/role.guard';
import { RolesEnum } from '@prisma/client';
import { Roles } from '../common/decorators';
import { CustomRequest, UpdateUserInput, User } from '../graphql';
import { TokenInterceptor } from '../common/interceptors/token.interceptor';
import { UserEntity } from './entities/user.entity';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.Admin)
  async getUsers() {
    const users = await this.usersService.getUsers();
    return users.map((user) => new UserEntity(user));
  }

  @Query(() => User)
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.User)
  @UseInterceptors(TokenInterceptor)
  async getUserById(
    @Context() context: CustomRequest,
    @Args('id', ParseIntPipe) id: number,
  ) {
    const accessToken = context.token;
    return new UserEntity(await this.usersService.getUserById(id, accessToken));
  }

  @Mutation('update')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Editor)
  async update(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const updatedInfo = await this.usersService.update(+id, updateUserInput);
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
  async userRemove(
    @Context() context: CustomRequest,
    @Args('id', ParseIntPipe) id: number,
  ) {
    const accessToken = context.token;
    return await this.usersService.userRemove(id, accessToken);
  }

  // Admin endpoints

  @Mutation('adminRemoveUser')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.Admin)
  async adminRemoveUser(@Args('id') id: string) {
    return await this.usersService.adminRemoveUser(+id);
  }

  @Mutation('updateRole')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.Admin)
  async updateRole(@Args('id') id: string, @Args('roleId') roleId: string) {
    return await this.usersService.updateRole(+id, +roleId);
  }
}
