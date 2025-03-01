import { useDialogStore } from "@/stores/store";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { GPSDeviceAssignPayload } from "@/constants/models/gps-device.model";
import { AssignDeviceToCar } from "@/app/(dashboard)/(admin)/cars/action";

export const useAssignDeviceMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = new QueryClient();

  const assignDeviceMutation = useMutation({
    mutationKey: ["assignDeviceMutation"],
    mutationFn: async (payload: GPSDeviceAssignPayload) => {
      await AssignDeviceToCar(payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.fetchQuery({ queryKey: ["gps-devices"] });
    },
    onError: () => {
      toast({ title: "Không thể gán thiết bị" });
    },
  });
  return {
    assignDeviceMutation,
  };
};
