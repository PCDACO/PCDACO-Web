import { OffsetPaginationResponse } from "../shared/offsetPagination.response";

export type GetContractStatusResponses =
  OffsetPaginationResponse<GetContractStatusResponse>;
export interface GetContractStatusResponse {
  id: string;
  name: string;
  createdAt: string;
}
