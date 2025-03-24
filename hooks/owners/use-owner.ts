import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OwnerApprovalPayload, OwnerParams, OwnerPendingApprovalResponse, OwnerResponse } from "@/constants/models/owner.model";
import { useDialogStore } from "@/stores/store";
import {
  DeleteOwners,
  GetOwner,
  GetOwners,
  PatchOwnerLicense,
} from "@/app/(dashboard)/(admin)/owners/action";
import { toast } from "../use-toast";
import { GetOwnerPendingApprovals } from "@/app/(dashboard)/(admin)/pending-approval/action";
import { generateGuid } from "@/lib/uuid";
import { BaseResponse, BaseResponseWithPagination } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";

interface OwnerQuery {
  params?: OwnerParams;
  id?: string;
}

export const useOwnerQuery = ({ params, id }: OwnerQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listOwnerQuery = useQuery({
    queryKey: ["owners", params],
    queryFn: () => GetOwners(params),
    initialData: BaseResponseWithPagination<OwnerResponse>,
    retry: 1
  });

  const ownerQuery = useQuery({
    queryKey: ["owner", id],
    queryFn: () => GetOwner(id ?? generateGuid()),
    initialData: BaseResponse<OwnerResponse>,
  });

  const listOwnerApprovalQuery = useQuery({
    queryKey: ["ownerApproval", params],
    queryFn: () => GetOwnerPendingApprovals(params),
    initialData: BaseResponseWithPagination<OwnerPendingApprovalResponse>,
  });

  return { listOwnerQuery, ownerQuery, listOwnerApprovalQuery };
};

export const useOwnerMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();
  const deleteOwnerMutation = useMutation({
    mutationKey: ["deleteOwner"],
    mutationFn: async (id: string) => await DeleteOwners(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["owners"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  const patchOwnerMutation = useMutation({
    mutationKey: ["approveOwner"],
    mutationFn: async ({
      id, payload
    }: {
      id: string,
      payload: OwnerApprovalPayload
    }) => await PatchOwnerLicense(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["ownerApproval"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });
  return {
    deleteOwnerMutation,
    patchOwnerMutation
  };
};
