import { Injectable } from '@nestjs/common';
import { CreateGroupPostInput } from './dto/create-group-post.input';
import { UpdateGroupPostInput } from './dto/update-group-post.input';

@Injectable()
export class GroupPostsService {
  create(createGroupPostInput: CreateGroupPostInput) {
    return 'This action adds a new groupPost';
  }

  findAll() {
    return `This action returns all groupPosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupPost`;
  }

  update(id: number, updateGroupPostInput: UpdateGroupPostInput) {
    return `This action updates a #${id} groupPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupPost`;
  }
}
