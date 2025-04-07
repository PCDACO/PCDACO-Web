"use server"

import axiosInstance from "@/app/axios.server"
import { BookingResponse } from "@/constants/models/booking.model"

export const GetBookingDetail = async (id: string): Promise<RootResponse<BookingResponse>> => {
  const response = await axiosInstance.get(`/api/bookings/${id}`);
  return response.data;
}
