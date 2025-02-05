export interface OffsetPaginationRequest {
  index: number;
  size: number;
  keyword: string;
  refetch?: () => void;
  setIndex: (page: number) => void;
  setSize: (size: number) => void;
  setKeyword: (keyword: string) => void;
  setRefetch: (refetch: () => void) => void;
}
