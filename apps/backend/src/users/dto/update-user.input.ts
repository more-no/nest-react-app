import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @Field({ nullable: true })
  username: string;

  @IsString()
  @Field({ nullable: true })
  fullname: string;

  @IsString()
  @Field({ nullable: true })
  bio: string;
}
