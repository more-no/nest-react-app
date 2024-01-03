import { Injectable } from '@nestjs/common';

// A basic service with only a single method in the beginning

@Injectable()
export class AppService {
  getHello(): string {
    return 'Greetings from the Backend!';
  }
}
