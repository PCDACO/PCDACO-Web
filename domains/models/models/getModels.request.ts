import { OffsetPaginationRequest } from "../shared/offsetPagination.request";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetModelsRequest extends OffsetPaginationRequest {
  manufacturerId: string;
  setManufacturerId: (manufacturerId: string) => void;
}
