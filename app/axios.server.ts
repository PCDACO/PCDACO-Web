"use server";

import { generateGuid } from "@/lib/uuid";
import axios from "axios";
import { cookies } from "next/headers";
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
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken.value}`;
  }

  if (config.method === "post") {
    config.headers["Idempotence-Key"] = generateGuid();
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
