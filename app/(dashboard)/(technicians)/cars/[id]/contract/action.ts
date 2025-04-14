"use server"

import axiosInstance from "@/app/axios.server"
export const GetCarContract = async (id: string): Promise<Document> => {
  const response = await axiosInstance.get(`/api/cars/${id}/contract`, {
    responseType: "document"
  });
  return response.data;
}

export const SignContract = async ({
  id, signature
}: {
  id: string;
  signature: string;
}): Promise<RootResponse<null>> => {
  const response = await axiosInstance.post(`/api/cars/${id}/contract/sign`, {
    signature: signature
  });
  return response.data;
}

