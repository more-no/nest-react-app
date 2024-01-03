import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
// Now, any property in CreateUserDto is optional in UpdateUserDto, allowing you to only send the fields that need to be updated when making requests to update a user.
