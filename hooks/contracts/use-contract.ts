import { toastError } from "@/lib/toast-error";
import { useMutation } from "@tanstack/react-query"

export const useContractMutation = () => {
  const approveContract = useMutation({
    mutationKey: ["approve-contract"],
    mutationFn: () => ,
    onSuccess: (response) => {
    },
    onError: (error: Error) => {
      toastError(error);
    }
  });
  return {
    approveContract
  }
}
