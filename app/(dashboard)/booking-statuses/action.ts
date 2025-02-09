"use server";

import axiosInstance from "@/app/axios.server";
import { GetBookingStatusesResponses } from "@/domains/models/booking-statuses/getBookingStatuses.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export const GetBookingStatuses = async ({
  index,
  size,
  keyword,
}: {
  index: number;
  size: number;
  keyword: string;
}): Promise<SharedResponse<GetBookingStatusesResponses>> => {
  try {
    const response = await axiosInstance.get("/api/booking-statuses", {
      params: {
        index: index,
        size: size,
        keyword: keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Không tìm thấy dữ liệu",
      value: null,
    };
  }
};
