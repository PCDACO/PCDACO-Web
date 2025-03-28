import { GetReports, ReviewReport } from "@/app/(dashboard)/(consultants)/reports/action";
import { ReportParams } from "@/constants/models/report.model";
import { toastError, toastResponse } from "@/lib/toast-error";
import { useDialogStore } from "@/stores/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface Props {
  params?: ReportParams;
}
export const useReportQuery = ({ params }: Props) => {
  if (!params) {
    params = {
      index: 1,
      size: 10,
      keyword: ""
    }
  }
  const listReports = useQuery({
    queryKey: ["reports"],
    queryFn: () => GetReports(params),
  });
  return { listReports }
}

export const useReportMutation = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialogStore();
  const reviewReport = useMutation({
    mutationKey: ["review-reports"],
    mutationFn: (id: string) => ReviewReport(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["reports"] });
        setOpen(false);
      }
    },
    onError: (error: Error) => {
      toastError(error);
    }
  });
  return {
    reviewReport,
  }
}
