import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  getUser(@Query('id') id: number) {
    return this.usersService.getUser(id);
  }

  // POST /Users
  // Since we are creating a new user, we need to also pass a @Body
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return {
      name: createUserDto.name,
    };
  }

  // PUT /users/:id --> { ... }
  // also the PUT needs a Body
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return {
      id,
      name: UpdateUserDto,
    };
  }

  // DELETE /users/:id
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return {
      id,
    };
  }
}

// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post()
//   create(@Body() createUserDto: CreateUserDto) {
//     return this.usersService.create(createUserDto);
//   }

//   @Get()
//   findAll() {
//     return this.usersService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.usersService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.usersService.update(+id, updateUserDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.usersService.remove(+id);
//   }
// }
