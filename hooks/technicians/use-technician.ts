import { CreateTechnicians, GetTechnicians } from "@/app/(dashboard)/(admin)/technicians/action";
import { TechnicianParams, TechnicianPayload, TechnicianResponse } from "@/constants/models/technician.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDialogStore } from "@/stores/store";
import { useRouter } from "next/navigation";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";

export const useTechnicianQuery = ({ params }: {
  params: TechnicianParams
}) => {
  const listTechnicians = useQuery({
    queryKey: ["technicians", params],
    queryFn: () => GetTechnicians(params),
    initialData: BaseResponseWithPagination<TechnicianResponse>,
    retry: 1
  });
  return { listTechnicians };
}
export const useTechnicianMutation = () => {
  const { setOpen } = useDialogStore();
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const createTechnician = useMutation({
    mutationKey: ["createTechnician"],
    mutationFn: (payload: TechnicianPayload) => CreateTechnicians(payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["technicians"] });
        replace("/technicians");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    }
  });
  return {
    createTechnician
  }
}
