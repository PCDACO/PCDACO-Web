import { Login, Logout } from "@/app/(auth)/login/action";
import { toastError, toastResponse } from "@/lib/toast-error";
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { replace } = useRouter();
  const login = useMutation({
    mutationKey: ["auth-login"],
    mutationFn: ({ email, password }: { email: string, password: string }) => Login({ email, password }),
    onSuccess: (response) => {
      toastResponse(response);
      replace("/statistics");
    },
    onError: (error) => {
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
