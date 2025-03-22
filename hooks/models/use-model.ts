import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDialogStore } from "@/stores/store";
import { toast } from "../use-toast";
import { ModelParams, ModelResponse } from "@/constants/models/model.model.ts";
import {
  DeleteModel,
  GetModels,
} from "@/app/(dashboard)/(admin)/manufacturers/[id]/models/action";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";

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
  const deleteModelMutation = useMutation({
    mutationKey: ["deleteModel"],
    mutationFn: async (id: string) => {
      await DeleteModel(id);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Xóa thành công" });
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
    onError: () => {
      toast({ title: "Không thể xóa mẫu này" });
    },
  });

  return {
    deleteModelMutation,
  };
};
