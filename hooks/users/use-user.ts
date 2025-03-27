import { BanUser, UnbanUser } from "@/app/actions/shared/action";
import { toastError, toastResponse } from "@/lib/toast-error";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUserMutation = () => {
  const queryClient = useQueryClient();
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
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });
  return {
    banUser,
    unbanUser
  }
}
