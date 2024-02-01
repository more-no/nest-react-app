import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/common/guards/role.guard';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    JwtModule.register({}),
  ],
  providers: [UsersService, RolesGuard],
})
export class UsersModule {}
