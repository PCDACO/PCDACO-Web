"use server";
import axiosInstance from "@/app/axios.server";
import {
  UserRoleParams,
  UserRoleResponse,
} from "@/constants/models/user-role.model";
import { CurrentUserResponse } from "@/constants/models/user.model";
import { cookies } from "next/headers";

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

export const GetToken = async () => {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get("accessToken"),
    refreshToken: cookieStore.get("refreshToken"),
    role: cookieStore.get("role"),
  };
};

export const GetUserRoles = async (
  params: UserRoleParams
): Promise<RootResponse<Pagination<UserRoleResponse>>> => {
  const response = await axiosInstance.get("/api/user-roles", { params });
  return response.data;
};

export const GetCurrentUser = async (): Promise<RootResponse<CurrentUserResponse>> => {
  const response = await axiosInstance.get("/api/users/current");
  return response.data;
}

export const BanUser = async ({ id, bannedReason }: {
  id: string,
  bannedReason: string,
}): Promise<RootResponse<null>> => {
  const response = await axiosInstance.post(`/api/users/${id}/ban`, {
    bannedReason
  });
  return response.data;
}

export const UnbanUser = async (id: string): Promise<RootResponse<null>> => {
  const response = await axiosInstance.post(`/api/users/${id}/unban`);
  return response.data;
}

