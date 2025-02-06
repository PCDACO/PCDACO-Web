export interface OffsetPaginationResponse<T> {
  items: T[];
  hasNext: boolean;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  setItems: (items: T[]) => void;
  setHasNext: (hasNext: boolean) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotalItems: (totalItems: number) => void;
}
