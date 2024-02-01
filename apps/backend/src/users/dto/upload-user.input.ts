import { IsNumber, IsString } from 'class-validator';

export class UploadResultInput {
  @IsNumber()
  userId: number;

  @IsString()
  filename: string;
}
