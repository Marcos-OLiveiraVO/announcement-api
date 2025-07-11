import { SetCacheInput } from './cacheRequest';

export abstract class ICacheRepository {
  abstract setCache(data: SetCacheInput): Promise<void>;
  abstract getCache(key: string): Promise<any>;
}
