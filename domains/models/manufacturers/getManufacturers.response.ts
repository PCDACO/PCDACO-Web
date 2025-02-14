import { ManufactureResponse } from "@/constants/models/manufacture.model";

export interface GetManufacturersResponses {
  items: ManufactureResponse[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  hasNext: boolean;
  setItems: (items: ManufactureResponse[]) => void;
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
