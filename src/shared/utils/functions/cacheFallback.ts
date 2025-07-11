import { FallbackWithCacheInput } from '../interfaces/globalInterface';

export async function useFallbackCacheOnFailure(data: FallbackWithCacheInput) {
  const fallback = await this.cacheRepository.getCache(data.cacheKey);

  if (!fallback) throw data.error;

  this.logger.warn({
    message: `Using fallback cache for ${data.operationName}`,
    context: {
      operationName: data.operationName,
      cacheKey: data.cacheKey,
    },
  });

  return fallback;
}
