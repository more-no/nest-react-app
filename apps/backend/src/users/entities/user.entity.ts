import { Exclude, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PersonalDataUserDto } from '../dto/personalDataUser.dto';

export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  fullname: string | null;

  @IsString()
  picture_url: string | null;

  @IsString()
  bio: string | null;

  @IsDate()
  date_registration: Date;

  @Exclude()
  password_hash: string;

  @Exclude()
  refresh_token: string;

  @IsNumber()
  post_count: number;

  @IsNumber()
  comment_count: number;

  @ValidateNested()
  @Type(() => PersonalDataUserDto)
  personal_data: PersonalDataUserDto[];
}
