import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreatePostInput } from './create-post.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePostInput extends PartialType(CreatePostInput) {
  @IsNotEmpty()
  @IsNumber()
  post_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
