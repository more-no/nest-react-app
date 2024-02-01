import { IsNumber, IsString } from 'class-validator';

export class UpdateUserInput {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  fullname: string;

  @IsString()
  bio: string;
}
