import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// here is where the logic goes - in Next.js is what would go into Database in a file like Users.ts
@Injectable()
// This is a class that contains different methods
export class UsersService {
  // this is a simple object to mock a database
  private users = [
    { id: 0, name: 'mark', type: 'customer' },
    { id: 1, name: 'lukas', type: 'admin' },
  ];

  create(createUserDto: CreateUserDto) {
    // the type in .create-user.dto has already name and type, but the id is missing..
    const newUser = {
      ...createUserDto,
      id: Date.now(),
    };
    this.users.push(newUser);

    return newUser;
  }

  getUsers(type?: 'customer' | 'admin') {
    if (type) {
      return this.users.filter((user) => user.type === type);
    }

    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
