// In Nest.js, DTO (Data Transfer Object) è un pattern che consente di definire oggetti che incapsulano i dati che vengono inviati tra i client e il server. Questi oggetti vengono utilizzati per definire la struttura dei dati che fluiscono attraverso le API, e spesso vengono utilizzati nelle operazioni di validazione dei dati di input.

import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthDto {
  // this is for the tutorial - ill have to adapt to my app later

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
