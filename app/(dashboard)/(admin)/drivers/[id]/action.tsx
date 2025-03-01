'use server'
import axiosInstance from "@/app/axios.server"
import { DriverResponse } from "@/constants/models/driver.model"

export const GetDriverById = async (id: string): Promise<RootResponse<DriverResponse>> => {
    const response = await axiosInstance.get(`/api/users/${id}`);
    return response.data;
}