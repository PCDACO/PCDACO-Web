import { OffsetPaginationResponse } from "../shared/offsetPagination.response";

export type GetCarStatusesResponses =
  OffsetPaginationResponse<GetCarStatusesResponse>;

export interface GetCarStatusesResponse {
  id: string;
  name: string;
  createdAt: string;
}
