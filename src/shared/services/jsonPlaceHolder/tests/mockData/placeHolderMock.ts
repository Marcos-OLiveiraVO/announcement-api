import { InternalServerErrorException } from '@nestjs/common';
import { PHPostsOutput } from '../../application/interfaces/jsonPHRequest';
import { ICacheRepository } from '@shared/services/cache/application/interfaces/ICacheRepository';
import { ILoggerRepository } from '@shared/services/logger/application/interfaces/ILoggerRepository';

export const mockPosts: PHPostsOutput[] = [
  {
    id: 1,
    title: 'Post',
    body: 'content',
    userId: 1,
  },
];

export const fallbackPostsMock: PHPostsOutput[] = [
  {
    id: 99,
    title: 'Fallback',
    body: 'cache',
    userId: 9,
  },
];

export const httpErrorMock = new InternalServerErrorException('Some http error');
export const unexpectedErrorMock = new Error('Unexpected');

export const mockCacheMethods: jest.Mocked<ICacheRepository> = {
  healthCheck: jest.fn(),
  setCache: jest.fn(),
  getCache: jest.fn(),
};

export const mockLoggerMethods: jest.Mocked<ILoggerRepository> = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};
