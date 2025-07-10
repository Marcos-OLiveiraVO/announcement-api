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
  page: number;
  limit: number;
}


export interface FetchData {
  url: string;
  request: any;
  retries?: number;
  retryDelay?: number;
}
