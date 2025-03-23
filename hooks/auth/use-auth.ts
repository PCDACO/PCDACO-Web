import { Login } from "@/app/(auth)/login/action";
import { toastResponse } from "@/lib/toast-error";
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { replace } = useRouter();
  const login = useMutation({
    mutationKey: ["auth-login"],
    mutationFn: ({ email, password }: { email: string, password: string }) => Login({ email, password }),
    onSuccess: (response) => {
      toastResponse
      replace("/dashboard");
    },
    onError: () => {
    }
  });
  return {
    login
  }
}
