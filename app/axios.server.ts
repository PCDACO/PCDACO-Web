"use server";

import { generateGuid } from "@/lib/uuid";
import axios from "axios";
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
    if (error.status === 401) {
    }
    if (axios.isCancel(error)) {
    }
    return error;
  }
);

export default axiosInstance;
