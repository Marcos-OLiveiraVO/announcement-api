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
