import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupPostsService } from './group-posts.service';
import { CreateGroupPostInput } from './dto/create-group-post.input';
import { UpdateGroupPostInput } from './dto/update-group-post.input';

@Resolver('GroupPost')
export class GroupPostsResolver {
  constructor(private readonly groupPostsService: GroupPostsService) {}

  @Mutation('createGroupPost')
  create(@Args('createGroupPostInput') createGroupPostInput: CreateGroupPostInput) {
    return this.groupPostsService.create(createGroupPostInput);
  }

  @Query('groupPosts')
  findAll() {
    return this.groupPostsService.findAll();
  }

  @Query('groupPost')
  findOne(@Args('id') id: number) {
    return this.groupPostsService.findOne(id);
  }

  @Mutation('updateGroupPost')
  update(@Args('updateGroupPostInput') updateGroupPostInput: UpdateGroupPostInput) {
    return this.groupPostsService.update(updateGroupPostInput.id, updateGroupPostInput);
  }

  @Mutation('removeGroupPost')
  remove(@Args('id') id: number) {
    return this.groupPostsService.remove(id);
  }
}
