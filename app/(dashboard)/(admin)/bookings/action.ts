"use server"

import axiosInstance from "@/app/axios.server"
import { BookingParams, ListBookingResponse } from "@/constants/models/booking.model"

export const GetBookings = async (params: BookingParams): Promise<RootResponse<Pagination<ListBookingResponse>>> => {
  const response = await axiosInstance.get("/api/bookings", {
    params: {
      index: params.index,
      size: params.size,
      search: params.keyword
    }
  });
  return response.data;
}
