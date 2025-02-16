import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OwnerPayLoad } from "@/constants/models/owner.model";
import { useOwnerMutation } from "./use-owner";
import {
  OwnerPayloadSchema,
  OwnerSchema,
} from "@/domains/schemas/owner.schema";

interface OwnerFormProps {
  id: string;
  value: OwnerPayLoad;
  action: string;
}

export const useOwnerForm = ({ id, value, action }: OwnerFormProps) => {
  const { deleteOwnerMutation } = useOwnerMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {
      name: id ? value.name : "",
      email: id ? value.email : "",
      address: id ? value.address : "",
      dateOfBirth: id ? value.dateOfBirth : new Date(),
      phone: id ? value.phone : "",
      role: id ? value.role : "",
      createdAt: id ? value.createdAt : new Date(),
    };
  }, [id, value]);

  const form = useForm<OwnerPayloadSchema>({
    resolver: zodResolver(OwnerSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async () => {
    switch (action) {
      case "delete": {
        deleteOwnerMutation.mutate(id);
        break;
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading: deleteOwnerMutation.isPending,
  };
};
