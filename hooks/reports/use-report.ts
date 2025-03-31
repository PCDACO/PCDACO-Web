import { ApproveReport } from "@/app/(dashboard)/(consultants)/reports/[id]/action";
import { GetReports, RejectReport, ReviewReport } from "@/app/(dashboard)/(consultants)/reports/action";
import { ApproveReportPayload, ReportParams } from "@/constants/models/report.model";
import { toastError, toastResponse } from "@/lib/toast-error";
import { useDialogStore } from "@/stores/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

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
  const { push } = useRouter();
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

  const rejectReport = useMutation({
    mutationKey: ["reject-reports"],
    mutationFn: ({
      id, reason
    }: {
      id: string,
      reason: string
    }) => RejectReport(id, reason),
    onSuccess: (response) => {
      console.log(response);
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["reports"] });
        push("/reports");
        setOpen(false);
      }
    },
    onError: (error: Error) => {
      console.log(error);
      toastError(error);
    }
  });
  const approveReport = useMutation({
    mutationKey: [""],
    mutationFn: ({ id, payload }:
      {
        id: string,
        payload: ApproveReportPayload,
      }) => ApproveReport(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["reports"] });
        push(`/reports`);
      }
    },
    onError: (error: Error) => {
      toastError(error);
    }
  });
  return {
    reviewReport,
    rejectReport,
    approveReport
  }
}
