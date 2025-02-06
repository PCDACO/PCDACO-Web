import { OffsetPaginationResponse } from "../shared/offsetPagination.response";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetModelsResponses
  extends OffsetPaginationResponse<GetModelsResponse> {}

export interface GetModelsResponse {
  id: string;
  name: string;
  releaseDate: string;
  createdAt: string;
  manufacturerDetail: ManufacturerDetail;
}
interface ManufacturerDetail {
  id: string;
  name: string;
}
