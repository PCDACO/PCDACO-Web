export interface GetAmenitiesRequest {
  index: number;
  size: number;
  keyword: string;
  setIndex: (index: number) => void;
  setSize: (size: number) => void;
  setKeyword: (keyword: string) => void;
}
