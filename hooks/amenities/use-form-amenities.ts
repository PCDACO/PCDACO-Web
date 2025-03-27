import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAmenityMutation } from "./use-amenities";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AmenityPayloadSchema,
  AmenitySchema,
} from "@/domains/schemas/amenity.schema";
import { AmenityPayLoad } from "@/constants/models/amenity.model";

interface AmenityForm {
  id: string;
  value: AmenityPayLoad;
  action: string;
}

export const useAmenityForm = ({ id, value, action }: AmenityForm) => {
  const { createAmentiy, deleteAmenity, updateAmenity } = useAmenityMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {
      name: id ? value.name : "",
      description: id ? value.description : "",
      icon: id ? value.icon : new DataTransfer().files,
    };
  }, [id, value]);

  const form = useForm<AmenityPayloadSchema>({
    resolver: zodResolver(AmenitySchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (payload) => {
    switch (action) {
      case "create": {
        createAmentiy.mutate(payload);
        break;
      }
      case "update": {
        updateAmenity.mutate({ id, payload });
        break;
      }
      case "delete": {
        deleteAmenity.mutate(id);
        break;
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading:
      createAmentiy.isLoading ||
      updateAmenity.isLoading ||
      deleteAmenity.isLoading,
  };
};
