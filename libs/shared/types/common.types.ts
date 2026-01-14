export type ApiResponse<T> = {
  data: T;
  message?: string;
  error?: string;
};

export type PaginationQuery = {
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
