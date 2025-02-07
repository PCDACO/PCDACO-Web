export interface GetAmenitiesResponses {
  items: GetAmenitiesResponse[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  hasNext: boolean;
  setItems: (items: GetAmenitiesResponse[]) => void;
  setHasNext: (hasNext: boolean) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotalItems: (totalItems: number) => void;
}

export interface GetAmenitiesResponse {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  createdAt: string;
}
