import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(/* config: ConfigService */) {
    // const url = config.get<string>('DATABASE_URL');

    super({
      datasources: {
        db: {
          url: 'postgresql://nest_react_app:nest_react_app@localhost:5432/nest_react_app?schema=nest_react_app',
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
