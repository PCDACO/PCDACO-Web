import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { OwnerParams } from "@/constants/models/owner.model";
import { useDialogStore } from "@/stores/store";
import {
  DeleteOwners,
  GetOwners,
} from "@/app/(dashboard)/(admin)/owners/action";
import { toast } from "../use-toast";

interface OwnerQuery {
  params?: OwnerParams;
}

export const useOwnerQuery = ({ params }: OwnerQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listOwnerQuery = useQuery({
    queryKey: ["owners", params],
    queryFn: () => GetOwners(params),
  });

  return { listOwnerQuery };
};

export const useOwnerMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = new QueryClient();
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

  return {
    deleteOwnerMutation,
  };
};
