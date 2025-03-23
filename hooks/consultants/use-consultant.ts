import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDialogStore } from "@/stores/store";
import { ConsultantParams, ConsultantPayload, ConsultantResponse } from "@/constants/models/consultant.model";
import { CreateConsultant, GetConsultants } from "@/app/(dashboard)/(admin)/consultants/action";
import { useRouter } from "next/navigation";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";

export const useConsultantQuery = ({ params }: {
  params: ConsultantParams
}) => {
  const listConsultants = useQuery({
    queryKey: ["consultants", params],
    queryFn: () => GetConsultants(params),
    initialData: BaseResponseWithPagination<ConsultantResponse>,
    retry: 1
  });
  return { listConsultants };
}
export const useConsultantMutation = () => {
  const { setOpen } = useDialogStore();
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const createConsultant = useMutation({
    mutationKey: ["createConsultant"],
    mutationFn: (payload: ConsultantPayload) => CreateConsultant(payload),
    onSuccess: (response) => {
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: "consultants" });
        replace("/consultants");
      }
      toastResponse(response);
    },
    onError: (error) => {
      toastError(error);
    }
  });
  return {
    createConsultant
  }
}
