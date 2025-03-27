import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TechnicianPayload } from "@/constants/models/technician.model";
import { useTechnicianMutation } from "./use-technician";
import {
  TechnicianSchema,
  TechnicianSchemaPayload,
} from "@/domains/schemas/technician.schema";

interface TechnicianFormProps {
  id: string;
  value: TechnicianPayload;
  action: string;
}

export const useTechnicianForm = ({
  id,
  value,
  action,
}: TechnicianFormProps) => {
  const { createTechnician } = useTechnicianMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {
      name: id ? value.name : "",
      email: id ? value.email : "",
      address: id ? value.address : "",
      password: id ? value.password : "",
      dateOfBirth: id ? value.dateOfBirth : new Date(),
      phone: id ? value.phone : "",
      roleName: id ? value.roleName : "",
    };
  }, [id, value]);

  const form = useForm<TechnicianSchemaPayload>({
    resolver: zodResolver(TechnicianSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (payload) => {
    switch (action) {
      case "create": {
        createTechnician.mutate(payload);
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading: createTechnician.isLoading,
  };
};
