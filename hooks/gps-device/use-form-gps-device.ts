import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GPSDevicePayload } from "@/constants/models/gps-device.model";
import { useGPSDeviceMutation } from "./use-gps-device";
import {
  GPSDevicePayloadSchema,
  GPSDeviceSchema,
} from "@/domains/schemas/gps-device.schema";

interface GPSDeviceFormProps {
  id: string;
  value: GPSDevicePayload;
  action: string;
}

export const useGPSDeviceForm = ({ id, value, action }: GPSDeviceFormProps) => {
  const {
    createGPSDeviceMutation,
    deleteGPSDeviceMutation,
    updateGPSDeviceMutation,
    unassignGPSDeviceMutation,
  } = useGPSDeviceMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    console.log(value);
    return {
      name: value.name ?? "",
      status: value.status ?? 0,
      carId: "",
    };
  }, [id, value]);

  const form = useForm<GPSDevicePayloadSchema>({
    resolver: zodResolver(GPSDeviceSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((payload) => {
    switch (action) {
      case "create": {
        deleteGPSDeviceMutation.mutate(id);
        break;
      }
      case "update": {
        updateGPSDeviceMutation.mutate({ id, payload });
        break;
      }
      case "delete": {
        unassignGPSDeviceMutation.mutate(id);
        break;
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading:
      createGPSDeviceMutation.isLoading ||
      updateGPSDeviceMutation.isLoading ||
      deleteGPSDeviceMutation.isLoading,
  };
};
