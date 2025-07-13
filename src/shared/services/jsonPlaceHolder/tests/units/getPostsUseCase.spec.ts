import { GetPostsUseCase } from '../../application/use-cases/getPostsUseCase';
import { ICacheRepository } from '@shared/services/cache/application/interfaces/ICacheRepository';
import { ILoggerRepository } from '@shared/services/logger/application/interfaces/ILoggerRepository';
import { InternalServerErrorException } from '@nestjs/common';
import { fetchWithRetry } from '@shared/utils/functions/retry';
import { useFallbackCacheOnFailure } from '@shared/utils/functions/cacheFallback';
import {
  fallbackPostsMock,
  httpErrorMock,
  mockCacheMethods,
  mockLoggerMethods,
  mockPosts,
  unexpectedErrorMock,
} from '../mockData/placeHolderMock';

jest.mock('@shared/utils/functions/retry');
jest.mock('@shared/utils/functions/cacheFallback');

describe('GetPostsUseCase', () => {
  let getPostsUseCase: GetPostsUseCase;
  let cacheRepository: jest.Mocked<ICacheRepository>;
  let loggerRepository: jest.Mocked<ILoggerRepository>;

  beforeEach(() => {
    cacheRepository = mockCacheMethods;
    loggerRepository = mockLoggerMethods;

    getPostsUseCase = new GetPostsUseCase(cacheRepository, loggerRepository);
  });

  it('should be able to fetch posts and store them in cache', async () => {
    (fetchWithRetry as jest.Mock).mockResolvedValue(mockPosts);

    const result = await getPostsUseCase.execute();

    expect(fetchWithRetry).toHaveBeenCalled();
    expect(result).toEqual(mockPosts);
    expect(cacheRepository.setCache).toHaveBeenCalledWith({
      key: 'posts',
      value: mockPosts,
      ttl: 300,
    });
  });

  it('should be able to return fallback data from cache if HttpException is thrown', async () => {
    (fetchWithRetry as jest.Mock).mockRejectedValue(httpErrorMock);
    (useFallbackCacheOnFailure as jest.Mock).mockResolvedValue(fallbackPostsMock);

    const result = await getPostsUseCase.execute();

    expect(useFallbackCacheOnFailure).toHaveBeenCalledWith({
      cacheKey: 'posts',
      cacheRepository,
      logger: loggerRepository,
      operationName: 'posts',
      error: httpErrorMock,
    });

    expect(result).toEqual(fallbackPostsMock);
  });

  it('should be able to throw InternalServerErrorException if error is not HttpException', async () => {
    (fetchWithRetry as jest.Mock).mockRejectedValue(unexpectedErrorMock);

    await expect(getPostsUseCase.execute()).rejects.toThrow(InternalServerErrorException);
  });
});
