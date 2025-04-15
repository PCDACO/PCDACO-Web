import { ConfirmWithdrawRequest } from "@/app/(dashboard)/(admin)/withdraw-requests/[id]/checkout/action";
import { GetWithdrawRequests } from "@/app/(dashboard)/(admin)/withdraw-requests/action";
import { WithdrawRequestParams, WithdrawRequestPayload } from "@/constants/models/withdraw-request.model"
import { toastError, toastResponse } from "@/lib/toast-error";
import { useDialogStore } from "@/stores/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  params?: WithdrawRequestParams;
}
export const useWithdrawRequestQuery = ({ params }: Props) => {
  if (!params) {
    params = {
      index: 1,
      size: 10,
      keyword: ""
    };
  }
  const listWithdrawRequest = useQuery({
    queryKey: ["withdraw-requests"],
    queryFn: () => GetWithdrawRequests(params),
  });


  return { listWithdrawRequest };
}

export const useWithdrawRequestMutation = () => {
  const { setOpen } = useDialogStore();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const confirmWithdrawRequest = useMutation({
    mutationKey: ["confirmWithdrawRequest"],
    mutationFn: ({
      id, payload
    }: {
      id: string,
      payload: WithdrawRequestPayload
    }) => ConfirmWithdrawRequest({ id, payload }),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["amenities"] });
        push("/withdraw-requests");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });
  return {
    confirmWithdrawRequest,
  }
}
