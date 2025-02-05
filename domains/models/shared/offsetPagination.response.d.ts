export interface OffsetPaginationResponse<T> {
  value: T[];
  index: number;
  size: number;
  hasNext: boolean;
  setValue: (value: T[]) => void;
}
