"use server"

import axiosInstance from "@/app/axios.server"
export const GetCarContract = async (id: string): Promise<Document> => {
  const response = await axiosInstance.get(`/api/cars/${id}/contract`, {
    responseType: "document"
  });
  return response.data;
}
