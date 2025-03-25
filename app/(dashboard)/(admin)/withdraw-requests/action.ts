"use server";

import axiosInstance from "@/app/axios.server";
import { WithdrawRequestParams, WithdrawRequestResponse } from "@/constants/models/withdraw-request.model";

export const GetWithdrawRequests = async (params: WithdrawRequestParams): Promise<RootResponse<Pagination<WithdrawRequestResponse>>> => {
  const response = await axiosInstance.get("/api/withdraw-requests", { params });
  return response.data;
}
