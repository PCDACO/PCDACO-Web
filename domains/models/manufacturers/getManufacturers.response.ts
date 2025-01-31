export interface GetManufacturersResponses {
  items: GetManufacturersResponse[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  hasNext: boolean;
  setItems: (items: GetManufacturersResponse[]) => void;
  setHasNext: (hasNext: boolean) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotalItems: (totalItems: number) => void;
}

export interface GetManufacturersResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}
