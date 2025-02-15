import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFuelTypeMutation } from "./use-fuel-type";
import { FuelTypePayload } from "@/constants/models/fuelType.model";
import {
  FuelTypePayloadSchema,
  FuelTypeSchema,
} from "@/domains/schemas/fuelType.schema";

interface FuelTypeForm {
  id: string;
  value: FuelTypePayload;
  action: string;
}

export const useFuelTypeForm = ({ id, value, action }: FuelTypeForm) => {
  const { createFuelType, deleteFuelType, updateFuelType } =
    useFuelTypeMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {
      name: id ? value.name : "",
    };
  }, [id, value]);

  const form = useForm<FuelTypePayloadSchema>({
    resolver: zodResolver(FuelTypeSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (payload) => {
    switch (action) {
      case "create": {
        createFuelType.mutate(payload);
        break;
      }
      case "update": {
        updateFuelType.mutate({ id, payload });
        break;
      }
      case "delete": {
        deleteFuelType.mutate(id);
        break;
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading:
      createFuelType.isPending ||
      updateFuelType.isPending ||
      deleteFuelType.isPending,
  };
};
