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
}

export const useManufacturerForm = ({ id, value }: ManufacturerForm) => {
  const { updateManufacturerMutation, createManufacturerMutation } =
    useManuFactureMutation();

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
    if (id) {
      updateManufacturerMutation.mutate({ id, payload });
    } else {
      createManufacturerMutation.mutate(payload);
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
