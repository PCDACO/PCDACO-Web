"use server";

import axiosInstance from "@/app/axios.server";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { GetTransactionStatusesResponses } from "@/domains/models/transaction-statuses/getTracsactionStatuses.response";

export const GetTransactionStatuses = async ({
  index,
  size,
  keyword,
}: {
  index: number;
  size: number;
  keyword: string;
}): Promise<SharedResponse<GetTransactionStatusesResponses>> => {
  try {
    const response = await axiosInstance.get("/api/transaction-statuses", {
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
