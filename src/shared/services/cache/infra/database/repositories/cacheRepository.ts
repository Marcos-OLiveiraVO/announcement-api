import Redis from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { SetCacheInput } from '@shared/services/cache/application/interfaces/cacheRequest';
import { ICacheRepository } from '@shared/services/cache/application/interfaces/ICacheRepository';

@Injectable()
export class CacheRepository implements ICacheRepository {
  constructor(@Inject('redis_cache') private redis: Redis) {}

  async setCache(data: SetCacheInput): Promise<void> {
    await this.redis.set(data.key, JSON.stringify(data.value), 'EX', data.ttl);
  }

  async getCache(key: string): Promise<any> {
    const data = await this.redis.get(key);

    return data ? JSON.parse(data) : null;
  }
}
