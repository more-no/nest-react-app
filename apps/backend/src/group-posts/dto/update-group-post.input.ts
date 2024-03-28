import { CreateGroupPostInput } from './create-group-post.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGroupPostInput extends PartialType(CreateGroupPostInput) {
  id: number;
}
