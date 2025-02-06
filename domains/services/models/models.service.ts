import axiosInstance from "@/configs/axios.client";
import { GetModelsResponses } from "@/domains/models/models/getModels.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export const ModelsApi = {
  getModels: async (
    index: number,
    size: number,
    keyword: string,
    manufacturerId: string
  ): Promise<SharedResponse<GetModelsResponses>> => {
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
  },
};
