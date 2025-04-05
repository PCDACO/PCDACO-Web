import { BanUser, UnbanUser } from "@/app/actions/shared/action";
import { UpdateProfile } from "@/app/actions/users/action";
import { UpdateUserPayload } from "@/constants/models/user.model";
import { toastError, toastResponse } from "@/lib/toast-error";
import { useDialogStore } from "@/stores/store";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export const useUserMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const banUser = useMutation({
    mutationKey: ["banUser"],
    mutationFn: ({
      id,
      bannedReason
    }: {
      id: string,
      bannedReason: string
    }) => BanUser({ id, bannedReason }),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["owners"] });
        queryClient.invalidateQueries({ queryKey: ["drivers"] });
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });
  const unbanUser = useMutation({
    mutationKey: ["unbanUser"],
    mutationFn: ({
      id,
    }: {
      id: string,
    }) => UnbanUser(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["owners"] });
        queryClient.invalidateQueries({ queryKey: ["drivers"] });
        setOpen(false);
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  const updateProfile = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: ({
      id, payload
    }: {
      id: string,
      payload: UpdateUserPayload
    }) => UpdateProfile(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        push("/profiles");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    }
  });

  return {
    banUser,
    unbanUser,
    updateProfile
  }
}
