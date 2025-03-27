import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GPSDeviceAssignPayload } from "@/constants/models/gps-device.model";
import { useAssignDeviceMutation } from "./use-assign-device";
import {
  AssignDevicePayloadSchema,
  AssignDeviceSchema,
} from "@/domains/schemas/assign-device.schema";

interface GPSDeviceFormProps {
  id: string;
  value: GPSDeviceAssignPayload;
}

export const useAssignDeviceForm = ({ id, value }: GPSDeviceFormProps) => {
  const { assignDeviceMutation } = useAssignDeviceMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {
      carId: "",
      deviceId: "",
      longtitude: 0,
      latitude: 0,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, value]);

  const form = useForm<AssignDevicePayloadSchema>({
    resolver: zodResolver(AssignDeviceSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (payload) => {
    await assignDeviceMutation.mutateAsync(payload);
  });

  return {
    form,
    onSubmit,
    isLoading: assignDeviceMutation.isLoading,
  };
};
