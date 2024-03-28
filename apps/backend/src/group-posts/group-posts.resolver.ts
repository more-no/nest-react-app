import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupPostsService } from './group-posts.service';
import { CreateGroupPostInput, UpdateGroupPostInput } from './dto';
import { ParseIntPipe } from '@nestjs/common';
import { GroupPost } from 'src/graphql';

@Resolver('GroupPost')
export class GroupPostsResolver {
  constructor(private readonly groupPostsService: GroupPostsService) {}

  @Query(() => GroupPost)
  async getGroupPosts() {
    return this.groupPostsService.getGroupPosts();
  }

  @Query(() => GroupPost)
  getGroupPostById(@Args('id', ParseIntPipe) id: number) {
    return this.groupPostsService.getGroupPostById(id);
  }

  @Mutation('createGroupPost')
  async createGroupPost(
    @Args('createGroupPostInput')
    { userIds, ...createGroupPostInput }: CreateGroupPostInput,
  ) {
    return this.groupPostsService.createGroupPost(
      userIds,
      createGroupPostInput,
    );
  }

  @Mutation('updateGroupPost')
  async updateGroupPost(
    @Args('userId', ParseIntPipe) userId: number,
    @Args('postId', ParseIntPipe) postId: number,
    @Args('updateGroupPostInput') updateGroupPostInput: UpdateGroupPostInput,
  ) {
    return this.groupPostsService.updateGroupPost(
      userId,
      postId,
      updateGroupPostInput.userIds,
      updateGroupPostInput,
    );
  }

  @Mutation('removeGroupPost')
  async removeGroupPost(
    @Args('userId', ParseIntPipe) userId: number,
    @Args('postId', ParseIntPipe) postId: number,
    @Args('userIds') userIds: number[],
  ) {
    console.log('DATA: ', userId, postId, userIds);
    return this.groupPostsService.removeGroupPost(userId, postId, userIds);
  }
}
