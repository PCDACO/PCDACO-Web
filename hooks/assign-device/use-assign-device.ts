import { useDialogStore } from "@/stores/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GPSDeviceAssignPayload } from "@/constants/models/gps-device.model";
import { AssignDeviceToCar } from "@/app/(dashboard)/(admin)/cars/action";
import { toastError, toastResponse } from "@/lib/toast-error";

export const useAssignDeviceMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();

  const assignDeviceMutation = useMutation({
    mutationKey: ["assignDeviceMutation"],
    mutationFn: async (payload: GPSDeviceAssignPayload) => await AssignDeviceToCar(payload),
    onSuccess: (response) => {
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["gps-devices"] });
      }
      toastResponse(response);
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });
  return {
    assignDeviceMutation,
  };
};
