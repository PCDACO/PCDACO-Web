import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OwnerApprovalPayload, OwnerParams } from "@/constants/models/owner.model";
import { useDialogStore } from "@/stores/store";
import {
  DeleteOwners,
  GetOwner,
  GetOwners,
  PatchOwnerLicense,
} from "@/app/(dashboard)/(admin)/owners/action";
import { toast } from "../use-toast";
import { GetOwnerPendingApproval, GetOwnerPendingApprovals } from "@/app/(dashboard)/(admin)/pending-approval/action";
import { generateGuid } from "@/lib/uuid";

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
    queryFn: () => GetOwners(params)
  });

  const ownerQuery = useQuery({
    queryKey: ["owner", id],
    queryFn: () => GetOwner(id ?? generateGuid())
  });

  const listOwnerApprovalQuery = useQuery({
    queryKey: ["ownerApproval", params],
    queryFn: () => GetOwnerPendingApprovals(params)
  });

  const ownerApprovalQuery = useQuery({
    queryKey: ["ownerApproval", id],
    queryFn: () => GetOwnerPendingApproval(id ?? generateGuid())
  });

  return { listOwnerQuery, ownerQuery, listOwnerApprovalQuery, ownerApprovalQuery };
};

export const useOwnerMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();
  const deleteOwnerMutation = useMutation({
    mutationKey: ["deleteOwner"],
    mutationFn: async (id: string) => {
      await DeleteOwners(id);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Xóa thành công" });
      queryClient.invalidateQueries({ queryKey: ["owners"] });
    },
    onError: () => {
      toast({ title: "Không thể xóa chủ xe này" });
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
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Cập nhật thành công" });
      queryClient.invalidateQueries({ queryKey: ["ownerApproval"] });
    },
    onError: () => {
      toast({ title: "Không thể xóa chủ xe này" });
    },
  });
  return {
    deleteOwnerMutation,
    patchOwnerMutation
  };
};
