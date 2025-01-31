import { NEXT_PUBLIC_API_URL } from "@/lib/env";
import axios from "axios";

const generateGuid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const random = (Math.random() * 16) | 0;
    return (c === "x" ? random : (random & 0x3) | 0x8).toString(16);
  });
};

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request:", config);
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.set("Idempotence-Key", generateGuid());
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    if (response.data.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    console.error("Response status:", error.response.status);
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
