import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateInspectionSchedules,
  GetInProgressInspectionSchedule,
  GetInspectionSchedules,
  RejectInspectionSchedules,
} from "@/app/(dashboard)/(consultants)/inspection-schedules/action";
import {
  CarInspectionSchedulePayload,
  GetInspectionSchedulesParams,
  InProgressInspectionScheduleResponse,
  InspectionScheduleDetail,
  InspectionSchedulePayload,
} from "@/constants/models/inspection-schedule.model";
import { useDialogStore } from "@/stores/store";
import { toast } from "../use-toast";
import { useRouter } from "next/navigation";
import { ApproveInspectionScheduleAction } from "@/app/(dashboard)/(technicians)/technician-todo/[id]/approve/action";
import { BaseResponse } from "@/constants/responses/base-response";

interface InspectionSchedulesQuery {
  params?: GetInspectionSchedulesParams;
}

export const useInspectionScheduleQuery = ({
  params,
}: InspectionSchedulesQuery) => {
  if (params === undefined) {
    const date = new Date()
    params = { month: date.getMonth(), year: date.getFullYear(), technicianId: undefined };
  }

  const listInspectionSchedules = useQuery({
    queryKey: ["inspection-schedules", params],
    queryFn: () => GetInspectionSchedules(params),
    initialData: BaseResponse<InspectionScheduleDetail[]>,
    retry: 1
  });

  const inProgressInspectionSchedule = useQuery({
    queryKey: ["inspection-schedules", "in-progress"],
    queryFn: () => GetInProgressInspectionSchedule(),
    initialData: BaseResponse<InProgressInspectionScheduleResponse>,
  });

  return { listInspectionSchedules, inProgressInspectionSchedule };
};

export const useInspectionScheduleMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  const createInspectionSchedule = useMutation({
    mutationKey: ["createInspectionSchedule"],
    mutationFn: async (payload: InspectionSchedulePayload) => {
      await CreateInspectionSchedules(payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["inspection-schedules"] });
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
      queryClient.invalidateQueries({ queryKey: ["inspection-schedules"] });
      replace("/inspection-schedules");
    },
    onError: () => {
      toast({ title: "Không thể thêm nhà sản xuất" });
    },
  });

  const approveInspectionSchedule = useMutation({
    mutationKey: ["rejectInspectionSchedule"],
    mutationFn: async ({
      id, payload
    }: {
      id: string,
      payload: CarInspectionSchedulePayload
    }) => {
      await ApproveInspectionScheduleAction(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspection-schedules"] });
      replace("/inspection-schedules");
    },
    onError: () => {
      toast({ title: "Không thể thêm nhà sản xuất" });
    },

  });
  return {
    createInspectionSchedule,
    rejectInspectionSchedule,
    approveInspectionSchedule,
  }
}

