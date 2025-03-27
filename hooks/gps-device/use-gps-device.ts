import { useDialogStore } from "@/stores/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GPSDeviceParams,
  GPSDevicePayload,
  GPSDeviceResponse,
} from "@/constants/models/gps-device.model";
import { CreateGPSDevice, DeleteGPSDevice, GetGPSDevices, UpdateGPSDevice } from "@/app/(dashboard)/(admin)/gps-devices/action";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";

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
    initialData: BaseResponseWithPagination<GPSDeviceResponse>,
    retry: 1
  });

  return { listGPSDeviceQuery };
};

export const useGPSDeviceMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();

  const createGPSDeviceMutation = useMutation({
    mutationKey: ["createGPSDevice"],
    mutationFn: async (payload: GPSDevicePayload) => await CreateGPSDevice(payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["gps-devices"] });
      }
    },
    onError: (error: Error) => {
      toastError(error);
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
    }) => await UpdateGPSDevice(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["gps-devices"] });
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  const deleteGPSDeviceMutation = useMutation({
    mutationKey: ["deleteGPSDevice"],
    mutationFn: async (id: string) => await DeleteGPSDevice(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["gps-devices"] });
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  return {
    createGPSDeviceMutation,
    updateGPSDeviceMutation,
    deleteGPSDeviceMutation,
  };
};
