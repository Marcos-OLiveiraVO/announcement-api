import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { fetchWithRetry } from '@shared/utils/functions/retry';
import { PHPostsOutput } from '../interfaces/jsonPHRequest';
import { ICacheRepository } from '@shared/services/cache/application/interfaces/ICacheRepository';

@Injectable()
export class GetPostsUseCase {
  constructor(private cacheRepository: ICacheRepository) {}

  async execute(): Promise<PHPostsOutput> {
    const cacheKey = 'posts';

    try {
      const posts = await fetchWithRetry('https://jsonplaceholder.typicode.com/posts');

      await this.cacheRepository.setCache({
        key: cacheKey,
        value: posts,
        ttl: 300,
      });

      return posts;
    } catch (error) {
      if (error instanceof HttpException) {
        const fallback = await this.cacheRepository.getCache(cacheKey);

        if (fallback) return fallback;

        throw error;
      }
    }

    throw new InternalServerErrorException('Unexpected error on fetch posts');
  }
}
