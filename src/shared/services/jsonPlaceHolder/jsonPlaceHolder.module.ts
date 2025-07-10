import { Module } from '@nestjs/common';
import { GetPostsUseCase } from './application/use-cases/getPostsUseCase';
import { GetPostsController } from './infra/http/controllers/getPostsController';

@Module({
  imports: [],
  providers: [GetPostsUseCase],
  controllers: [GetPostsController],
})
export class JsonPlaceHolderModule {}
