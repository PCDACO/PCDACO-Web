import axiosInstance from "@/app/axios.server";
import { GetModelsResponses } from "@/domains/models/models/getModels.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export const GetModels = async ({
  index,
  size,
  keyword,
  manufacturerId,
}: {
  index: number;
  size: number;
  keyword: string;
  manufacturerId: string;
}): Promise<SharedResponse<GetModelsResponses>> => {
  const response = await axiosInstance.get(
    `/api/manufacturers/${manufacturerId}/models`,
    {
      params: {
        index: index,
        size: size,
        keyword: keyword,
      },
    }
  );
  return response.data;
};
