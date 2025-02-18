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
  } = useGPSDeviceMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {
      name: id ? value.name : "",
    };
  }, [id, value]);

  const form = useForm<GPSDevicePayloadSchema>({
    resolver: zodResolver(GPSDeviceSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (payload) => {
    switch (action) {
      case "create": {
        createGPSDeviceMutation.mutate(payload);
        break;
      }
      case "update": {
        updateGPSDeviceMutation.mutate({ id, payload });
        break;
      }
      case "delete": {
        deleteGPSDeviceMutation.mutate(id);
        break;
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading:
      createGPSDeviceMutation.isPending ||
      updateGPSDeviceMutation.isPending ||
      deleteGPSDeviceMutation.isPending,
  };
};
