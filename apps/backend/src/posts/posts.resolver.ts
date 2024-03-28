import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators';
import { AtGuard } from '../common/guards';
import { RolesGuard } from '../common/guards/role.guard';
import { RolesEnum } from '@prisma/client';
import { CreatePostInput, UpdatePostInput } from './dto';
import { Post } from 'src/graphql';

@UseGuards(AtGuard, RolesGuard)
@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => Post)
  @Roles(RolesEnum.User, RolesEnum.Editor, RolesEnum.Admin)
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Query(() => Post)
  @Roles(RolesEnum.User, RolesEnum.Editor, RolesEnum.Admin)
  async getPostById(@Args('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @Mutation('createPost')
  @Roles(RolesEnum.User)
  async create(
    @Args('id', ParseIntPipe) id: number,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postsService.createPost(id, createPostInput);
  }

  @Mutation('updatePost')
  @Roles(RolesEnum.User, RolesEnum.Editor)
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postsService.updatePost(id, updatePostInput);
  }

  @Mutation('removePost')
  @Roles(RolesEnum.User, RolesEnum.Editor)
  async remove(
    @Args('id', ParseIntPipe) id: number,
    @Args('postId', ParseIntPipe) postId: number,
  ) {
    return this.postsService.removePost(id, postId);
  }
}
