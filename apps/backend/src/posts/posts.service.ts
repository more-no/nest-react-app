import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // findAll() {
  //   return `This action returns all posts`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} post`;
  // }

  async create(id: number, createPostInput: CreatePostInput) {
    try {
      const newPost = await this.prisma.post.create({
        data: {
          user_id: id,
          title: createPostInput.title,
          body: createPostInput.body,
        },
      });

      return {
        postId: newPost.id,
        userId: newPost.user_id,
        title: newPost.title,
        body: newPost.body,
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to create the post: ${error.message}`,
      );
    }
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    try {
      const updatedPost = await this.prisma.post.update({
        where: {
          id: updatePostInput.post_id,
          user_id: id,
        },
        data: {
          title: updatePostInput.title,
          body: updatePostInput.body,
        },
      });

      return {
        postId: updatedPost.id,
        userId: updatedPost.user_id,
        title: updatedPost.title,
        body: updatedPost.body,
      };
    } catch (error) {
      throw new NotFoundException(`Failed to update user: ${error.message}`);
    }
  }

  async remove(id: number, postId: number) {
    try {
      const deletedPost = await this.prisma.post.delete({
        where: {
          id: postId,
          user_id: id,
        },
      });

      return {
        id: deletedPost.id,
      };
    } catch (error) {
      throw new NotFoundException(`Post not found: ${error.message}`);
    }
  }
}
