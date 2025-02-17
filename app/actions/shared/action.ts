"use server";
import axiosInstance from "@/app/axios.server";

export const ValidateToken = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const validateResponse = await axiosInstance.post(
    "/api/auth/validate-token",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (validateResponse.status === 200) {
    return {
      isSuccess: true,
      message: "Valid",
      value: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }
  const refreshResponse = await axiosInstance.post("/api/auth/refresh-token", {
    body: {
      refreshToken: refreshToken,
    },
  });
  if (refreshResponse.status === 200) {
    return {
      isSuccess: true,
      message: "Valid",
      value: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }
  return {
    isSuccess: false,
    message: "Invalid",
    value: null!,
  };
};

export const GetToken = () => {};
