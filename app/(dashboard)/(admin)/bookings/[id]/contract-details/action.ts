"use server"

import axiosInstance from "@/app/axios.server"

export const GetBookingContract = async (id: string): Promise<Document> => {
  const response = await axiosInstance.get(`/api/bookings/${id}/contract`);
  console.log(response);
  return response.data;
}


