import { OffsetPaginationResponse } from "../shared/offsetPagination.response";

export type GetTransactionStatusesResponses =
  OffsetPaginationResponse<GetTransactionStatusesResponse>;
export interface GetTransactionStatusesResponse {
  id: string;
  name: string;
  createdAt: string;
}
