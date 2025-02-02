export interface GetTransmissionsResponses {
  items: GetTransmissionResponse[];
  hasNext: boolean;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  setItems: (items: GetTransmissionResponse[]) => void;
  setHasNext: (hasNext: boolean) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotalItems: (totalItems: number) => void;
}
export interface GetTransmissionResponse {
  id: string;
  name: string;
  createdAt: string;
}
