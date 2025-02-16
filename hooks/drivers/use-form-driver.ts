import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOwnerMutation } from "./use-driver";
import { DriverPayLoad } from "@/constants/models/driver.model";
import {
  DriverPayloadSchema,
  DriverSchema,
} from "@/domains/schemas/driver.schema";

interface DriverFormProps {
  id: string;
  value: DriverPayLoad;
  action: string;
}

export const useDriverForm = ({ id, value, action }: DriverFormProps) => {
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

  const form = useForm<DriverPayloadSchema>({
    resolver: zodResolver(DriverSchema),
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
