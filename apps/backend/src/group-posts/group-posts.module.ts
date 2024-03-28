import { Module } from '@nestjs/common';
import { GroupPostsService } from './group-posts.service';
import { GroupPostsResolver } from './group-posts.resolver';

@Module({
  providers: [GroupPostsResolver, GroupPostsService],
})
export class GroupPostsModule {}
