import { OffsetPaginationResponse } from "../shared/offsetPagination.response";

export type GetCompensationStatusesResponses =
  OffsetPaginationResponse<GetCompensationStatusesResponse>;

export type GetCompensationStatusesResponse = {
  id: string;
  name: string;
  createdAt: string;
};
