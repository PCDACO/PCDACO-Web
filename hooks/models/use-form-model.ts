"use client";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModelMutation } from "./use-model";
import {
  ModelPayloadSchema,
  ModelSchema,
} from "@/domains/schemas/model.schema";
import { useForm } from "react-hook-form";
import { ModelPayLoad } from "@/constants/models/model.model.ts";

interface ModelFormProps {
  id: string;
  value: ModelPayLoad;
  action: string;
}

export const useModelForm = ({ id, value, action }: ModelFormProps) => {
  const {
    createModelMutation,
    updateModelMutation,
    deleteModelMutation
  } = useModelMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {
      name: id ? value.name : "",
      releaseDate: id ? value.releaseDate : new Date(),
      manufacturerId: id ? value.manufacturerId : "",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, value]);

  const form = useForm<ModelPayloadSchema>({
    resolver: zodResolver(ModelSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((payload) => {
    switch (action) {
      case "create": {
        createModelMutation.mutate(payload);
        break;
      }
      case "update": {
        updateModelMutation.mutate({ id, payload });
        break;
      }
      case "delete": {
        deleteModelMutation.mutate(id);
        break;
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading:
      createModelMutation.isLoading ||
      updateModelMutation.isLoading ||
      deleteModelMutation.isLoading,
  };
};
