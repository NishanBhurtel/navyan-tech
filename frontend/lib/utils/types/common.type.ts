export type TPagination = {
  total: number; // total number of items in DB
  page: number; // current page number
  limit: number; // items per page
  totalPages: number; // total number of pages
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: TPagination;
};