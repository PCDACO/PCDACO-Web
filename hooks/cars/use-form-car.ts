import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCarMutation } from "./use-car";
import { CarPayload } from "@/constants/models/car.model";
import { CarPayloadSchema, CarSchema } from "@/domains/schemas/car.schema";
import { useForm } from "react-hook-form";

interface CarFormProps {
  id: string;
  value: CarPayload;
  action: string;
}

export const useCarForm = ({ id, value, action }: CarFormProps) => {
  const { deleteCarMutation } = useCarMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, value]);

  const form = useForm<CarPayloadSchema>({
    resolver: zodResolver(CarSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async () => {
    switch (action) {
      case "delete": {
        deleteCarMutation.mutate(id);
        break;
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading: deleteCarMutation.isLoading,
  };
};
