import { Module } from '@nestjs/common';
import { GetPostsUseCase } from './application/use-cases/getPostsUseCase';
import { GetPostsController } from './infra/http/controllers/getPostsController';
import { ICacheRepository } from '../cache/application/interfaces/ICacheRepository';
import { CacheRepository } from '../cache/infra/database/repositories/cacheRepository';
import { CacheModule } from '../cache/cache.module';
import { LoggerModule } from '../logger/logger.module';
import { ILoggerRepository } from '../logger/application/interfaces/ILoggerRepository';
import { LoggerRepository } from '../logger/infra/database/repositories/loggerRepository';

@Module({
  imports: [CacheModule, LoggerModule],
  providers: [
    GetPostsUseCase,
    { provide: ICacheRepository, useClass: CacheRepository },
    { provide: ILoggerRepository, useClass: LoggerRepository },
  ],
  controllers: [GetPostsController],
})
export class JsonPlaceHolderModule {}
