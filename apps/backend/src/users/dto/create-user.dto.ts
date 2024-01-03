import { IsEnum, MinLength } from 'class-validator';

// here is where you define the properties of the User
// then it can be imported as we would a type
export class CreateUserDto {
  @MinLength(3)
  // this is for validate input arriving to the database, but then we must also add it where the @Body from the user arrives.. for example in a @Post route
  name: string;

  @IsEnum(['customer', 'admin'], { message: 'Use correct type' })
  type: 'customer' | 'admin';
}
