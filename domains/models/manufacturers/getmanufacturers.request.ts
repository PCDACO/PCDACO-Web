export interface GetManufacturersRequest {
  index: number;
  size: number;
  keyword: string | null;
  setIndex: (index: number) => void;
  setSize: (size: number) => void;
  setKeyword: (keyword: string) => void;
}
