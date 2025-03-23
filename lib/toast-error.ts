"use client"
import { toast } from "@/hooks/use-toast"

export const toastError = (error: Error) => {
  if (error.message) {
    toast({ title: error.message });
  } else {
    toast({ title: "Thất Bại" });
  }
}

export const toastResponse = <T>(response: RootResponse<T>) => {
  if (response.message) {
    toast({ title: response.message });
  } else {
    toast({ title: "Thực Hiện Thành Công" });
  }
}
