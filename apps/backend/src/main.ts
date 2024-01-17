import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// The entry file of the application which uses the core function NestFactory to create a Nest application instance.

async function bootstrap() {
  // here we simply start up our HTTP listener, which lets the application await inbound HTTP requests.
  const app = await NestFactory.create(AppModule);
  // we apply the validators
  app.useGlobalPipes(new ValidationPipe());
  app.listen(3000);
}
bootstrap();
