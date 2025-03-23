import { useDialogStore } from "@/stores/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FuelTypeParams,
  FuelTypePayload,
  FuelTypeResponse,
} from "@/constants/models/fuelType.model";
import {
  CreateFuelType,
  DeleteFuelType,
  GetFuelTypes,
  UpdateFuelType,
} from "@/app/(dashboard)/(admin)/fuel-types/action";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";

interface FuelTypeQuery {
  params?: FuelTypeParams;
}

export const useFuelTypeQuery = ({ params }: FuelTypeQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listFuelTypeQuery = useQuery({
    queryKey: ["fueltypes", params],
    queryFn: () => GetFuelTypes(params),
    initialData: BaseResponseWithPagination<FuelTypeResponse>,
    retry: 1
  });

  return { listFuelTypeQuery };
};

export const useFuelTypeMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();

  const createFuelType = useMutation({
    mutationKey: ["createFuelType"],
    mutationFn: async (payload: FuelTypePayload) => await CreateFuelType(payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["fueltypes"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  const updateFuelType = useMutation({
    mutationKey: ["updateFuelType"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: FuelTypePayload;
    }) => await UpdateFuelType(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["fueltypes"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  const deleteFuelType = useMutation({
    mutationKey: ["deleteFuelType"],
    mutationFn: async (id: string) => await DeleteFuelType(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["fueltypes"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  return {
    createFuelType,
    updateFuelType,
    deleteFuelType,
  };
};
