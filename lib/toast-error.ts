"use client"
import { toast } from "@/hooks/use-toast"

export const toastError = (error: Error) => {
  if (error.message) {
    toast({
      title: "Thất bại !",
      description: error.message,
      variant: "destructive",
    });
  } else {
    toast({
      title: "Thất Bại",
      variant: "destructive"
    });
  }
}

export const toastResponse = <T>(response: RootResponse<T>) => {
  if (response.isSuccess && response.message) {
    toast({
      title: "Thành công !",
      description: response.message,
      variant: "default"
    })
  }
  else if (response.message) {
    toast({
      title: "Thất bại !",
      description: response.message,
      variant: "destructive"
    })
  }
  else {
    toast({
      title: "Thực Hiện Thành Công",
      variant: "destructive"
    });
  }
}
