import { ApproveCarReport, RejectCarReport } from "@/app/(dashboard)/(admin)/car-reports/[id]/action";
import { GetCarReports } from "@/app/(dashboard)/(admin)/car-reports/action";
import { CarReportParams } from "@/constants/models/car-report.model"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastResponse } from "@/lib/toast-error";
import { useRouter } from "next/navigation";

interface QueryProps {
  params: CarReportParams;
}
export const useCarReportQuery = ({ params }: QueryProps) => {
  if (!params) {
    params = {
      index: 1,
      size: 10,
      keyword: "",
    }
  }

  const listCarReport = useQuery({
    queryKey: ["car-reports"],
    queryFn: () => GetCarReports(params),
  });

  return { listCarReport }
}

export const useCarReportMutation = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const approveCarReport = useMutation({
    mutationKey: ["approve-car-report"],
    mutationFn: ({
      id, note
    }: {
      id: string,
      note: string,
    }) => ApproveCarReport({ id, note }),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        push("/car-reports");
        queryClient.invalidateQueries({ queryKey: ["car-reports"] });
      }
    }
  });

  const rejectCarReport = useMutation({
    mutationKey: ["reject-car-report"],
    mutationFn: ({
      id, note
    }: {
      id: string,
      note: string,
    }) => RejectCarReport({ id, note }),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        push("/car-reports");
        queryClient.invalidateQueries({ queryKey: ["car-reports"] });
      }
    }
  });
  return {
    approveCarReport,
    rejectCarReport
  }
}
