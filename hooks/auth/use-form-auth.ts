import { LoginPayloadSchema, LoginSchema } from "@/domains/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react"
import { useForm } from "react-hook-form";
import { useAuthMutation } from "./use-auth";

export const useAuthForm = () => {
  const { login } = useAuthMutation();
  const defaultValue = useMemo(() => {
    return {
      email: "",
      password: ""
    };
  }, [])

  const form = useForm<LoginPayloadSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultValue,
  });

  const onSubmit = form.handleSubmit((payload) => {
    login.mutate(payload);
  })

  return {
    form,
    onSubmit,
    isLoading: login.isLoading
  }
}
