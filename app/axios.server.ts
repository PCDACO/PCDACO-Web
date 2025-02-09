"use server";

import { generateGuid } from "@/lib/uuid";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CancelToken = axios.CancelToken;

const getUrl = () => {
  if (typeof window === "undefined") {
    // we are on the server
    return process.env.NEXT_PRIVATE_API_URL || "";
  }
};

const axiosInstance = axios.create({
  baseURL: getUrl(),
  timeout: 10000,
  headers: {
    Accept: "*/*",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  const source = CancelToken.source();
  config.cancelToken = source.token;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (accessToken) {
    const response = await fetch(`${getUrl()}/api/auth/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken!.value}`,
      },
    });
    if (response.status === 401) {
      const refreshToken = cookieStore.get("refreshToken");
      if (!refreshToken) {
        source.cancel("Request canceled due to invalid token.");
        redirect("/login");
      }
      const response = await fetch(`${getUrl()}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshToken!.value,
        }),
      });
      if (response.status === 401) {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        source.cancel("Request canceled due to invalid token.");
        redirect("/login");
      } else {
        const data = await response.json();
        cookieStore.set("accessToken", data.value.accessToken);
        cookieStore.set("refreshToken", data.value.refreshToken);
        config.headers.Authorization = `Bearer ${data.value.accessToken}`;
      }
    } else {
      if (config.method === "post") {
        config.headers["Idempotence-Key"] = generateGuid();
      }
      config.headers.Authorization = `Bearer ${accessToken!.value}`;
    }
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const cookieStore = await cookies();
    const source = CancelToken.source();
    console.log("Response failed", error.response);
    if (error.status === 401) {
      source.cancel("Request canceled due to invalid token.");
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
    }
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
