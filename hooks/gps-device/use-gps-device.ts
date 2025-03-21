import { useDialogStore } from "@/stores/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import {
  GPSDeviceParams,
  GPSDevicePayload,
} from "@/constants/models/gps-device.model";
import { CreateGPSDevice, DeleteGPSDevice, GetGPSDevices, UpdateGPSDevice } from "@/app/(dashboard)/(admin)/gps-devices/action";

interface GPSDeviceQuery {
  params?: GPSDeviceParams;
}

export const useGPSDeviceQuery = ({ params }: GPSDeviceQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listGPSDeviceQuery = useQuery({
    queryKey: ["gps-devices", params],
    queryFn: () => GetGPSDevices(params),
    retry: 1
  });

  return { listGPSDeviceQuery };
};

export const useGPSDeviceMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();

  const createGPSDeviceMutation = useMutation({
    mutationKey: ["createGPSDevice"],
    mutationFn: async (payload: GPSDevicePayload) => {
      await CreateGPSDevice(payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["gps-devices"] });
    },
    onError: () => {
      toast({ title: "Không thể tạo thiết bị" });
    },
  });

  const updateGPSDeviceMutation = useMutation({
    mutationKey: ["updateGPSDevice"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: GPSDevicePayload;
    }) => {
      await UpdateGPSDevice(id, payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["gps-devices"] });
    },
    onError: () => {
      toast({ title: "Không thể cập nhật thiết bị" });
    },
  });

  const deleteGPSDeviceMutation = useMutation({
    mutationKey: ["deleteGPSDevice"],
    mutationFn: async (id: string) => {
      await DeleteGPSDevice(id);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Xóa thành công" });
      queryClient.invalidateQueries({ queryKey: ["gps-devices"] });
    },
    onError: () => {
      toast({ title: "Không thể xóa thiết bị" });
    },
  });

  return {
    createGPSDeviceMutation,
    updateGPSDeviceMutation,
    deleteGPSDeviceMutation,
  };
};
