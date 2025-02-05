import axiosInstance from "@/configs/axios.config";
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
      console.log(response.data);
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
};
