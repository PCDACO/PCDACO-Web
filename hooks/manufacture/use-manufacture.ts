import {
  GetManufacturers,
  CreateManufacturer,
  DeleteManufacturer,
  UpdateManufacturer,
} from "@/app/(dashboard)/(admin)/manufacturers/action";
import {
  ManufactureParams,
  ManufacturePayload,
  ManufactureResponse,
} from "@/constants/models/manufacture.model";
import { useDialogStore } from "@/stores/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";

interface ManufactureQuery {
  params?: ManufactureParams;
}

export const useManuFactureQuery = ({ params }: ManufactureQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listManuFactureQuery = useQuery({
    queryKey: ["manufacturers", params],
    queryFn: () => GetManufacturers(params),
    initialData: BaseResponseWithPagination<ManufactureResponse>,
    retry: 1
  });

  return { listManuFactureQuery };
};

export const useManuFactureMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();

  const createManufacturerMutation = useMutation({
    mutationKey: ["createManufacturer"],
    mutationFn: async (payload: ManufacturePayload) => await CreateManufacturer(payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  const updateManufacturerMutation = useMutation({
    mutationKey: ["updateManufacturer"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: ManufacturePayload;
    }) => await UpdateManufacturer(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  const deleteManufacturerMutation = useMutation({
    mutationKey: ["deleteManufacturer"],
    mutationFn: async (id: string) => await DeleteManufacturer(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  return {
    createManufacturerMutation,
    updateManufacturerMutation,
    deleteManufacturerMutation,
  };
};
