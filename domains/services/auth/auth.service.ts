import axiosInstance from "@/configs/axios.client";
import { LoginResponse } from "../../models/auth/login.response";
import { SharedResponse } from "../../models/shared/shared.response";

export const AuthApi = {
  login: async (
    email: string,
    password: string
  ): Promise<SharedResponse<LoginResponse>> => {
    try {
      const response = await axiosInstance.post<SharedResponse<LoginResponse>>(
        "api/auth/login",
        {
          email,
          password,
        }
      );
      return response.data; // Return the response data directly
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        isSuccess: error.response.data.isSuccess,
        message: error.response.data.message,
        value: error.response.data.value,
      };
    }
  },
  logout: async () => {
    try {
      const response = await axiosInstance.post("api/auth/logout");
      return response.data; // Return the response data directly
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        isSuccess: error.response.data.isSuccess,
        message: error.response.data.message,
        value: error.response.data.value,
      };
    }
  },
  checkToken: async () => {
    try {
      const response = await axiosInstance.get("api/auth/check-auth");
      return response.data;
    } catch {
      return {
        isSuccess: false,
        message: "",
        value: null,
      };
    }
  },
};
