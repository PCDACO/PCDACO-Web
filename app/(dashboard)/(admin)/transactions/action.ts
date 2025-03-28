"use server"

import axiosInstance from "@/app/axios.server"
import { TransactionParams, TransactionResponse } from "@/constants/models/transaction.model"

export const GetTransactions = async (params: TransactionParams): Promise<RootResponse<Pagination<TransactionResponse>>> => {
  const response = await axiosInstance.get("/api/transactions", {
    params
  });
  return response.data;
}
