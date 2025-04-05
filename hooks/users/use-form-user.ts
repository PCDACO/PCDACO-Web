import { UpdateUserPayload } from "@/constants/models/user.model"
import { UpdateUserPayloadSchema, UpdateUserSchema } from "@/domains/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useUserMutation } from "./use-user";

interface Props {
  id: string;
  value: UpdateUserPayload;
}
export const useUpdateUserForm = ({ id, value }: Props) => {
  const { updateProfile } = useUserMutation();
  const defaultValues = useMemo(() => {
    return {
      name: id ? value.name : "",
      email: id ? value.email : "",
      address: id ? value.address : "",
      dateOfBirth: id ? value.dateOfBirth : new Date(),
      phone: id ? value.phone : "",
    }
  }, [value])

  const form = useForm<UpdateUserPayloadSchema>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((payload) => updateProfile.mutate({ id, payload }));

  return {
    form,
    onSubmit,
    isLoading: updateProfile.isLoading
  }
}
