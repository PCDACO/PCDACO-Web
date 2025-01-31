export interface GetCarsRequest {
  index: number;
  size: number;
  keyword: string;
  setIndex: (index: number) => void;
  setSize: (size: number) => void;
  setKeyword: (keyword: string) => void;
}
