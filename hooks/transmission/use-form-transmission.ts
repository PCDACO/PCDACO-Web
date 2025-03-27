import { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  ManufacturerPayloadSchema,
  ManufacturerSchema,
} from "@/domains/schemas/manufacturer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ManufacturePayload } from "@/constants/models/manufacture.model";
import { useTransmissionMutation } from "./use-transmission";

interface TransmissionForm {
  id: string;
  value: ManufacturePayload;
  action: string;
}

export const useTransmissionForm = ({
  id,
  value,
  action,
}: TransmissionForm) => {
  const { createTransmission, updateTransmission, deleteTransmission } =
    useTransmissionMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {
      name: id ? value.name : "",
    };
  }, [id, value]);

  const form = useForm<ManufacturerPayloadSchema>({
    resolver: zodResolver(ManufacturerSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (payload) => {
    switch (action) {
      case "create": {
        createTransmission.mutate(payload);
        break;
      }
      case "update": {
        updateTransmission.mutate({ id, payload });
        break;
      }
      case "delete": {
        deleteTransmission.mutate(id);
        break;
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading:
      createTransmission.isLoading ||
      updateTransmission.isLoading ||
      deleteTransmission.isLoading,
  };
};
