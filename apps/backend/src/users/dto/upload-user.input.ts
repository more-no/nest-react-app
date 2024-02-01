import { IsNumber, IsString } from 'class-validator';

export class UploadInput {
  @IsNumber()
  userId: number;

  @IsString()
  filename: string;
}
