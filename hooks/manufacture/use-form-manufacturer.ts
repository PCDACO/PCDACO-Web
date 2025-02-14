import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useManuFactureMutation } from "./use-manufacture";
import {
  ManufacturerPayloadSchema,
  ManufacturerSchema,
} from "@/domains/schemas/manufacturer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ManufacturePayload } from "@/constants/models/manufacture.model";

interface ManufacturerForm {
  id: string;
  value: ManufacturePayload;
  action: string;
}

export const useManufacturerForm = ({
  id,
  value,
  action,
}: ManufacturerForm) => {
  const {
    updateManufacturerMutation,
    createManufacturerMutation,
    deleteManufacturerMutation,
  } = useManuFactureMutation();

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
        createManufacturerMutation.mutate(payload);
        break;
      }
      case "update": {
        updateManufacturerMutation.mutate({ id, payload });
        break;
      }
      case "delete": {
        deleteManufacturerMutation.mutate(id);
        break;
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading:
      createManufacturerMutation.isPending ||
      updateManufacturerMutation.isPending,
  };
};
