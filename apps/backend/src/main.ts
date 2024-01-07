import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// The entry file of the application which uses the core function NestFactory to create a Nest application instance.

async function bootstrap() {
  // here we simply start up our HTTP listener, which lets the application await inbound HTTP requests.
  const app = await NestFactory.create(AppModule);
  // i set a GlobalPrefix that is identical to the one in 'vite.config.ts' for the path of the backend server
  app.listen(3000);
}
bootstrap();
