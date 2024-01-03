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

  createUser(createUserDto: CreateUserDto) {
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
      // this error would be coming from the database
    }

    return user;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      // In this specific context, the spread operator is used to create a new object by combining the properties of two objects: user and updateUserDto. The first spread operator (...user) takes all the properties of the existing user object, and the second spread operator (...updateUserDto) takes all the properties of the updateUserDto object. By combining them, you create a new object that includes all the properties from both objects.
      if (user.id === id) {
        return { ...user, ...updateUserDto };
        // This method takes an id and an UpdateUserDto. When updating a user, it uses the spread operator to merge the existing user with the properties provided in updateUserDto. Since UpdateUserDto is a partial type, it means you can send only the fields you want to update, and the rest will remain unchanged.
      }

      return user;
    });

    return this.getUser(id);
    // in this case the two returns gives back the same object
  }

  deleteUser(id: number) {
    const toBeRemoved = this.getUser(id);

    this.users = this.users.filter((user) => user.id != id);

    return toBeRemoved;
  }
}
