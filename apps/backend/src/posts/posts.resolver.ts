import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators';
import { AtGuard } from '../common/guards';
import { RolesGuard } from '../common/guards/role.guard';
import { RolesEnum } from '@prisma/client';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  // @Query('posts')
  // findAll() {
  //   return this.postsService.findAll();
  // }

  // @Query('post')
  // findOne(@Args('id') id: number) {
  //   return this.postsService.findOne(id);
  // }

  @Mutation('createPost')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.User)
  create(
    @Args('id') id: string,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postsService.createPost(+id, createPostInput);
  }

  @Mutation('updatePost')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Editor)
  update(
    @Args('id') id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postsService.updatePost(+id, updatePostInput);
  }

  @Mutation('removePost')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Editor)
  remove(@Args('id') id: string, @Args('postId') postId: string) {
    return this.postsService.removePost(+id, +postId);
  }
}
