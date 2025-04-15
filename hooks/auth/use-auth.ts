import { Login, Logout } from "@/app/(auth)/login/action";
import { LoginPayload } from "@/constants/models/auth.model";
import { toastError, toastResponse } from "@/lib/toast-error";
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export const useAuthMutation = () => {
  const { push } = useRouter();
  const login = useMutation({
    mutationKey: ["auth-login"],
    mutationFn: ({ email, password }: LoginPayload) => Login({ email, password }),
    onSuccess: (response) => {
      console.log("success")
      toastResponse(response);
      if (response.isSuccess) {
        push("/statistics");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    }
  });
  const logout = useMutation({
    mutationKey: ["auth-logout"],
    mutationFn: () => Logout(),
    onSuccess: () => {
    },
    onError: () => {
    }
  });
  return {
    login,
    logout
  }
}
