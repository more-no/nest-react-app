import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @Field({ nullable: true })
  fullname: string;

  @IsString()
  @Field({ nullable: true })
  bio: string;
}
