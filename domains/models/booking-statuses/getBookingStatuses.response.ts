import { OffsetPaginationResponse } from "../shared/offsetPagination.response";

export type GetBookingStatusesResponses =
  OffsetPaginationResponse<GetBookingStatusesResponse>;
export interface GetBookingStatusesResponse {
  id: string;
  name: string;
  createdAt: string;
}
