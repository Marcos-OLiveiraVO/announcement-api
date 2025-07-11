import { Module } from '@nestjs/common';
import { ICacheRepository } from './application/interfaces/ICacheRepository';
import { CacheRepository } from './infra/database/repositories/cacheRepository';
import Redis from 'ioredis';

@Module({
  imports: [],
  providers: [
    { provide: ICacheRepository, useClass: CacheRepository },
    {
      provide: 'redis_cache',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
        });
      },
    },
  ],
  controllers: [],
})
export class CacheModule {}
