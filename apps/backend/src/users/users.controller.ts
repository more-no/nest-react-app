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

// here 'users' is the common path of the API
@Controller('users')
export class UsersController {
  // // GET /users --> []
  // @Get()
  // getUsers() {
  //   return [];
  // }

  // GET /users?type=superuser
  // not only params, but also queries can be included
  @Get()
  getUsers(@Query('type') type: string) {
    return [{ type }];
  }

  // GET /Users/:id --> { ... }
  @Get(':id')
  // The @param decorator extracts the params property from the req object and populates the decorated parameter with the value of params
  // it's kind of like passing it as a props in React
  getSingleUser(@Param('id') id: string) {
    return {
      id,
    };
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
