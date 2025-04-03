import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDialogStore } from "@/stores/store";
import { ModelParams, ModelPayLoad, ModelResponse } from "@/constants/models/model.model.ts";
import {
  CreateModel,
  DeleteModel,
  GetModels,
  UpdateModel,
} from "@/app/(dashboard)/(admin)/manufacturers/[id]/models/action";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";
import { useRouter } from "next/navigation";

interface ModelQuery {
  manufacturerId: string;
  params?: ModelParams;
}

export const useModelQuery = ({ manufacturerId, params }: ModelQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listModelQuery = useQuery({
    queryKey: ["models", params],
    queryFn: () => GetModels(manufacturerId, params),
    initialData: BaseResponseWithPagination<ModelResponse>,
    retry: 1
  });

  return { listModelQuery };
};

export const useModelMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const createModelMutation = useMutation({
    mutationKey: ["create"],
    mutationFn: (payload: ModelPayLoad) => CreateModel(payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["models"] });
        push("/manufacturers");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  const updateModelMutation = useMutation({
    mutationKey: [""],
    mutationFn: ({
      id, payload
    }: {
      id: string,
      payload: ModelPayLoad
    }) => UpdateModel(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["models"] });
        push("/manufacturers");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  const deleteModelMutation = useMutation({
    mutationKey: ["deleteModel"],
    mutationFn: (id: string) => DeleteModel(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["models"] });
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  return {
    createModelMutation,
    updateModelMutation,
    deleteModelMutation,
  };
};
