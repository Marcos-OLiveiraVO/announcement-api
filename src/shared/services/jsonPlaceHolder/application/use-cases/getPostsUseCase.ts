import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { fetchWithRetry } from '@shared/utils/functions/retry';
import { PHPostsOutput } from '../interfaces/jsonPHRequest';
import { ICacheRepository } from '@shared/services/cache/application/interfaces/ICacheRepository';
import { ILoggerRepository } from '@shared/services/logger/application/interfaces/ILoggerRepository';
import { useFallbackCacheOnFailure } from '@shared/utils/functions/cacheFallback';

@Injectable()
export class GetPostsUseCase {
  constructor(
    private cacheRepository: ICacheRepository,
    private logger: ILoggerRepository,
  ) {}

  async execute(): Promise<PHPostsOutput> {
    const cacheKey = 'posts';

    try {
      const posts = await fetchWithRetry({
        url: 'https://jsonplaceholder.typicode.com/posts',
        operationName: 'posts',
        logger: this.logger,
      });

      await this.cacheRepository.setCache({
        key: cacheKey,
        value: posts,
        ttl: 300,
      });

      return posts;
    } catch (error) {
      if (error instanceof HttpException) {
        return await useFallbackCacheOnFailure({
          cacheKey,
          cacheRepository: this.cacheRepository,
          logger: this.logger,
          operationName: 'posts',
          error,
        });
      }
    }

    throw new InternalServerErrorException('Unexpected error on fetch posts');
  }
}
