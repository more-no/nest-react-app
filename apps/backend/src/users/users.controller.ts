import {
  Body,
  Controller,
  Delete,
  Get,
  ImATeapotException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

// instantiate under the hood in Nest is kinda like this:
//    const service = new UsersService();
//    const controller = new UsersController(service);
// these passages are done behind the scenes by Nest when we create a constructor... we'll never have to instantiate classes manually
// this is dependencies injection !!

// here 'users' is the common path of the API
@Controller('users')
export class UsersController {
  // instead of instantiate the service for every method like for getSingleUSer below -
  // we can do it only once for the entire controller with a constructor - its like importing it once instead that each time..
  // what we are actually doing is injecting a class called UsersService from 'users.service.ts'
  // so we are saying that the UsersController depends on the UsersService, and we are doing that by providing it as an argument to the constructor
  constructor(private readonly usersService: UsersService) {}

  // GET /users?type=superuser
  // not only params, but also queries can be included
  @Get()
  getUsers(@Query('type') type: 'customer' | 'admin') {
    // In order to get access to the 'getUsers' method, I need to instantiate an instance of the class 'UsersService'
    // In Next.js it's kinda like importing a function 'getUsers' from Users.ts from /Database into a routes, in order to define the logic of a GET request
    //        const service = new UsersService();   <==   no need to instantiate for every single method - we can use a constructor at the top of the controller
    // now that I have instantiated the service/provider I get access to the .getUsers method
    //        return service.getUsers(type);        <==   below the alternative method with the constructor
    return this.usersService.getUsers(type); // I get now the method out fo the constructor...
  }

  // GET /Users/:id --> { ... }
  @Get(':id')
  // The @param decorator extracts the params property from the req object and populates the decorated parameter with the value of params
  // it's kind of like passing it as a props in React
  getUser(@Param('id') id: string) {
    try {
      return this.usersService.getUser(+id);
      // the + switch to the type to number
    } catch (err) {
      throw new NotFoundException();
      // this error is throw in the browser
    }
  }

  // POST /Users
  // Since we are creating a new user, we need to also pass a @Body:
  //    {
  //    "name": "tom",
  //    "type": "manager"
  //    }
  @Post()
  // the Pipe here functions kinda like Zod in NEXT.js - validating the user input on the client side - it gives back a statusCode and a message
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // PUT /users/:id --> { ... }
  // also the PUT needs a Body
  @Put(':id')
  // rather then using hte "+" to transform the type in a number as above in the @Get(':id') example
  // we can use a Pipe - in this way any input will be transformed directly in a number
  // and we right after we can already define it with a type "number"
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(+id, UpdateUserDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(+id);
  }
}
