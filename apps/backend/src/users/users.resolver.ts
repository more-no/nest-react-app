import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { AtGuard } from '../common/guards';
import { RolesGuard } from '../common/guards/role.guard';
import { RolesEnum } from '@prisma/client';
import { Roles } from '../common/decorators';
import { TokenInterceptor } from '../common/interceptors/token.interceptor';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'prisma/prisma.service';
import { User } from 'src/graphql';
import { CustomRequestUserDto, UpdateUserInput } from './dto';

@UseGuards(AtGuard, RolesGuard)
@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  @Query(() => User)
  @Roles(RolesEnum.Admin)
  async getUsers() {
    const users = await this.usersService.getUsers();
    return users.map((user) => new UserEntity(user));
  }

  @Query(() => User)
  @Roles(RolesEnum.User)
  @UseInterceptors(TokenInterceptor)
  async getUserById(
    @Context() context: CustomRequestUserDto,
    @Args('id', ParseIntPipe) id: number,
  ) {
    const accessToken = context.token;
    return new UserEntity(await this.usersService.getUserById(id, accessToken));
  }

  @Mutation('userUpdate')
  @Roles(RolesEnum.User, RolesEnum.Editor)
  async userUpdate(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const updatedInfo = await this.usersService.userUpdate(id, updateUserInput);
    return {
      username: updatedInfo.username,
      fullname: updatedInfo.fullname,
      bio: updatedInfo.bio,
    };
  }

  @Mutation('userRemove')
  @Roles(RolesEnum.User)
  @UseInterceptors(TokenInterceptor)
  async userRemove(
    @Context() context: CustomRequestUserDto,
    @Args('id', ParseIntPipe) id: number,
  ) {
    const accessToken = context.token;
    return await this.usersService.userRemove(id, accessToken);
  }

  // Admin endpoints

  @Mutation('adminRemoveUser')
  @Roles(RolesEnum.Admin)
  async adminRemoveUser(@Args('id', ParseIntPipe) id: number) {
    return await this.usersService.adminRemoveUser(id);
  }

  @Mutation('updateRole')
  @Roles(RolesEnum.Admin)
  async updateRole(
    @Args('id', ParseIntPipe) id: number,
    @Args('roleId', ParseIntPipe) roleId: number,
  ) {
    return await this.usersService.updateRole(id, roleId);
  }
}
