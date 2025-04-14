import { SignContract } from "@/app/(dashboard)/(technicians)/cars/[id]/contract/action";
import { toastError, toastResponse } from "@/lib/toast-error";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useContractMutation = () => {
  const { push } = useRouter();
  const approveContract = useMutation({
    mutationKey: ["approve-contract"],
    mutationFn: ({
      id,
      signature
    }: {
      id: string,
      signature: string
    }) => SignContract({
        id,signature
      }),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        push("/technician-todo/approve")
      }
    },
    onError: (error: Error) => {
      toastError(error);
    }
  });
  return {
    approveContract
  }
}
