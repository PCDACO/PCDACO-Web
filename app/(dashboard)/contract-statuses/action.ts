import axiosInstance from "@/app/axios.server";
import { GetContractStatusResponses } from "@/domains/models/contract-statuses/getContractStatuses.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export const GetContractStatus = async ({
  index,
  size,
  keyword,
}: {
  index: number;
  size: number;
  keyword: string;
}): Promise<SharedResponse<GetContractStatusResponses>> => {
  const response = await axiosInstance.get("/api/contract-statuses", {
    params: {
      index: index,
      size: size,
      keyword: keyword,
    },
  });
  return response.data;
};