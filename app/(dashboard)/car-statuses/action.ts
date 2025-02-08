"use server";

import axiosInstance from "@/app/axios.server";
import { GetCarStatusesResponses } from "@/domains/models/car-statuses/getCarStatuses.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export async function GetCarStatuses({
  index,
  size,
  keyword,
}: {
  index: number;
  size: number;
  keyword: string;
}): Promise<SharedResponse<GetCarStatusesResponses>> {
  const response = await axiosInstance.get("/api/car-statuses", {
    params: {
      index: index,
      size: size,
      keyword: keyword,
    },
  });
  return response.data;
}
