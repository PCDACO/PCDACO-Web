"use server"

import axiosInstance from "@/app/axios.server"
import { WithdrawRequestPayload, WithdrawRequestQRResponse } from "@/constants/models/withdraw-request.model"

export const GenerateQRCode = async (id: string): Promise<RootResponse<WithdrawRequestQRResponse>> => {
  const response = await axiosInstance.get(`/api/withdrawals/${id}/qr`);
  return response.data;
}

export const ConfirmWithdrawRequest = async ({
  id,
  payload
}: {
  id: string,
  payload: WithdrawRequestPayload
}): Promise<RootResponse<null>> => {
  const formData = new FormData();
  formData.append("adminNote", payload.adminNote);
  if (payload.transactionProof?.length ?? 0 > 0) {
    formData.append("transactionProof", payload.transactionProof![0] as File);
  }
  console.log(formData);
  const response = await axiosInstance.postForm(`/api/withdrawals/${id}/confirm`, formData);
  return response.data;
}
