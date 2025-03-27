import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConsultantPayload } from "@/constants/models/consultant.model";
import { useConsultantMutation } from "./use-consultant";
import {
  ConsultantSchema,
  ConsultantSchemaPayload,
} from "@/domains/schemas/consultant.schema";

interface ConsultantFormProps {
  id: string;
  value: ConsultantPayload;
  action: string;
}

export const useConsultantForm = ({
  id,
  value,
  action,
}: ConsultantFormProps) => {
  const { createConsultant } = useConsultantMutation();

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

  const form = useForm<ConsultantSchemaPayload>({
    resolver: zodResolver(ConsultantSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (payload) => {
    switch (action) {
      case "create": {
        createConsultant.mutate(payload);
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading: createConsultant.isLoading,
  };
};
