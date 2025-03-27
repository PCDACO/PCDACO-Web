"use server";

import axiosInstance from "@/app/axios.server";
import { WithdrawRequestParams, WithdrawRequestResponse } from "@/constants/models/withdraw-request.model";

export const GetWithdrawRequests = async (params: WithdrawRequestParams): Promise<RootResponse<Pagination<WithdrawRequestResponse>>> => {
  const response = await axiosInstance.get("/api/withdrawals", { params });
  return response.data;
}
