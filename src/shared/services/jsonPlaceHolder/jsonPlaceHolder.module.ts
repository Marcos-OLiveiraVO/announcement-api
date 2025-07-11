import { Module } from '@nestjs/common';
import { GetPostsUseCase } from './application/use-cases/getPostsUseCase';
import { GetPostsController } from './infra/http/controllers/getPostsController';
import { ICacheRepository } from '../cache/application/interfaces/ICacheRepository';
import { CacheRepository } from '../cache/infra/database/repositories/cacheRepository';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [GetPostsUseCase, { provide: ICacheRepository, useClass: CacheRepository }],
  controllers: [GetPostsController],
})
export class JsonPlaceHolderModule {}
