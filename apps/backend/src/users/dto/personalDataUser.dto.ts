import { IsNumber, IsString } from 'class-validator';

export class PersonalDataUserDto {
  @IsString()
  first_name?: string;

  @IsString()
  last_name?: string;

  @IsNumber()
  age?: number;

  @IsString()
  nationality?: string;
}
