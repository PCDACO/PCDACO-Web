export interface GetFuelTypesResponses {
  items: GetFuelTypesResponse[];
  hasNext: boolean;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  setItems: (items: GetFuelTypesResponse[]) => void;
  setHasNext: (hasNext: boolean) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotalItems: (totalItems: number) => void;
}
export interface GetFuelTypesResponse {
  id: string;
  name: string;
  createdAt: string;
}
