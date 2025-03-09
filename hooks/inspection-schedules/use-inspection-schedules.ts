import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateInspectionSchedules,
  GetInspectionSchedules,
  RejectInspectionSchedules,
} from "@/app/(dashboard)/(consultants)/inspection-schedules/action";
import {
  GetInspectionSchedulesParams,
  InspectionSchedulePayload,
} from "@/constants/models/inspection-schedule.model";
import { useDialogStore } from "@/stores/store";
import { toast } from "../use-toast";
import { useRouter } from "next/navigation";

interface InspectionSchedulesQuery {
  params?: GetInspectionSchedulesParams;
}

export const useInspectionScheduleQuery = ({
  params,
}: InspectionSchedulesQuery) => {
  if (params === undefined) {
    params = { month: 3, year: 2025, technicianId: undefined };
  }

  const listInspectionSchedules = useQuery({
    queryKey: ["inspection-schedules", params],
    queryFn: () => GetInspectionSchedules(params),
  });

  return { listInspectionSchedules };
};

export const useInspectionScheduleMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = new QueryClient();
  const { replace } = useRouter();

  const createInspectionSchedule = useMutation({
    mutationKey: ["createInspectionSchedule"],
    mutationFn: async (payload: InspectionSchedulePayload) => {
      await CreateInspectionSchedules(payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.fetchQuery({ queryKey: ["inspection-schedules"] });
      replace("/inspection-schedules");
    },
    onError: () => {
      toast({ title: "Không thể thêm nhà sản xuất" });
    },
  });

  const rejectInspectionSchedule = useMutation({
    mutationKey: ["rejectInspectionSchedule"],
    mutationFn: async (id: string) => {
      await RejectInspectionSchedules(id);
    },
    onSuccess: () => {
      queryClient.fetchQuery({ queryKey: ["inspection-schedules"] });
      replace("/inspection-schedules");
    },
    onError: () => {
      toast({ title: "Không thể thêm nhà sản xuất" });
    },
  });
  return {
    createInspectionSchedule,
    rejectInspectionSchedule
  }
}

