import { ICacheRepository } from '@shared/services/cache/application/interfaces/ICacheRepository';
import { ILoggerRepository } from '@shared/services/logger/application/interfaces/ILoggerRepository';

export interface PaginationMetadata {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  totalItemsOnThisPage: number;
  limitPerPage: number;
}

export interface Pagination<T> {
  data: T[];
  metadata: PaginationMetadata;
}

export interface BasePagination {
  page?: number;
  limit?: number;
}

export interface FetchData {
  url: string;
  request: any;
  retries?: number;
  retryDelay?: number;
}

export interface loggerInput {
  level: string;
  message: string;
  context?: Record<string, any>;
}

export interface FetchWithRetryInput {
  url: string;
  logger: ILoggerRepository;
  operationName?: string;
}

export interface FallbackWithCacheInput {
  cacheRepository: ICacheRepository;
  cacheKey: string;
  logger: ILoggerRepository;
  operationName: string;
  error?: Error;
}
