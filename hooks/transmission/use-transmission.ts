import { useDialogStore } from "@/stores/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TransmissionParams,
  TransmissionPayload,
  TransmissionResponse,
} from "@/constants/models/transmission.model";
import {
  CreateTransmission,
  DeleteTransmission,
  GetTransmissions,
  UpdateTransmission,
} from "@/app/(dashboard)/(admin)/transmissions/action";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";

interface TransmissionQuery {
  params?: TransmissionParams;
}

export const useTransmissionQuery = ({ params }: TransmissionQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listTransmissionQuery = useQuery({
    queryKey: ["transmissions", params],
    queryFn: () => GetTransmissions(params),
    initialData: BaseResponseWithPagination<TransmissionResponse>,
    retry: 1
  });

  return { listTransmissionQuery };
};

export const useTransmissionMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();

  const createTransmission = useMutation({
    mutationKey: ["createTransmission"],
    mutationFn: async (payload: TransmissionPayload) => await CreateTransmission(payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["transmissions"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  const updateTransmission = useMutation({
    mutationKey: ["updateTransmission"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: TransmissionPayload;
    }) => await UpdateTransmission(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["transmissions"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  const deleteTransmission = useMutation({
    mutationKey: ["deleteManufacturer"],
    mutationFn: async (id: string) => await DeleteTransmission(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["transmissions"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  return {
    createTransmission,
    updateTransmission,
    deleteTransmission,
  };
};
