import axiosInstance from "@/configs/axios.client";
import { GetCompensationStatusesResponses } from "@/domains/models/compensation-statuses/getCompensationStatuses.response";
import { AxiosOffsetPaginationRequest } from "@/domains/models/shared/requests/axiosOffsetPagination.request";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export const CompensationStatusesApi = {
  getCompensationStatuses: async ({
    index,
    size,
    keyword,
  }: AxiosOffsetPaginationRequest): Promise<
    SharedResponse<GetCompensationStatusesResponses>
  > => {
    try {
      const response = await axiosInstance.get(`api/compensation-statuses`, {
        params: {
          index: index,
          size: size,
          keyword: keyword,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fetch failed", error);
      throw error;
    }
  },

  createCompensationStatus: async (name: string) => {
    try {
      const response = await axiosInstance.post("api/compensation-statuses", {
        name: name,
      });
      return response.data;
    } catch (error) {
      console.error("Fetch failed", error);
      throw error;
    }
  },
};
