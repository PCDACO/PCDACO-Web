import axiosInstance from "@/configs/axios.client";
import { SharedResponse } from "../../models/shared/shared.response";
import { GetCarsResponses } from "../../models/cars/getcars.response";
export const CarApi = {
  getCarForAdmin: async (
    index: number,
    size: number,
    keyword: string
  ): Promise<SharedResponse<GetCarsResponses>> => {
    // Construct the URL with conditional query parameters
    let url = `api/cars/all?index=${index}&size=${size}`;

    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }

    const response = axiosInstance
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Fetch failed", error);
        throw error;
      });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  },
};
