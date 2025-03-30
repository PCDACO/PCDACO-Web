import { CreateCompensation } from "@/app/actions/compensations/action";
import { CompensationPayload } from "@/constants/models/compensation.model";
import { toastError, toastResponse } from "@/lib/toast-error";
import { useDialogStore } from "@/stores/store";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export const useCompensationMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const createCompensation = useMutation({
    mutationKey: ["create-compensation"],
    mutationFn: ({
      id,
      payload
    }: {
      id: string,
      payload: CompensationPayload
    }) => CreateCompensation(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["compensations"] });
        setOpen(false);
        push("/reports");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    }
  });
  return {
    createCompensation,
  }
}
