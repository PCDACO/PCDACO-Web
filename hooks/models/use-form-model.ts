"use client";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarPayload } from "@/constants/models/car.model";
import { useModelMutation } from "./use-model";
import {
  ModelPayloadSchema,
  ModelSchema,
} from "@/domains/schemas/model.schema";
import { useForm } from "react-hook-form";

interface CarFormProps {
  id: string;
  value: CarPayload;
  action: string;
}

export const useModelForm = ({ id, value, action }: CarFormProps) => {
  const { deleteModelMutation } = useModelMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, value]);

  const form = useForm<ModelPayloadSchema>({
    resolver: zodResolver(ModelSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async () => {
    switch (action) {
      case "delete": {
        deleteModelMutation.mutate(id);
        break;
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading: deleteModelMutation.isLoading,
  };
};
