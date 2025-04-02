import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateInspectionSchedules,
  DeleteInspectionSchedules,
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
import { useRouter } from "next/navigation";
import { ApproveInspectionScheduleAction } from "@/app/(dashboard)/(technicians)/technician-todo/approve/action";
import { BaseResponse } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";
import { UpdateCarContractByScheduleInfo } from "@/app/(dashboard)/(technicians)/technician-todo/[id]/action";

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
  const { push } = useRouter();

  const createInspectionSchedule = useMutation({
    mutationKey: ["createInspectionSchedule"],
    mutationFn: (payload: InspectionSchedulePayload) => CreateInspectionSchedules(payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["inspection-schedules"] });
        push("/inspection-schedules");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  const rejectInspectionSchedule = useMutation({
    mutationKey: ["rejectInspectionSchedule"],
    mutationFn: async ({
      id, note
    }: {
      id: string, note: string
    }) => await RejectInspectionSchedules({ id, note }),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["inspection-schedules"] });
        push("/inspection-schedules");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  const approveInspectionSchedule = useMutation({
    mutationKey: ["rejectInspectionSchedule"],
    mutationFn: async ({
      id, payload
    }: {
      id: string,
      payload: CarInspectionSchedulePayload
    }) => await ApproveInspectionScheduleAction(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["inspection-schedules"] });
        push("/inspection-schedules");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },

  });

  const updateContractFromScheduleInfo = useMutation({
    mutationKey: ["update-contract-from-schedule"],
    mutationFn: (id: string) => UpdateCarContractByScheduleInfo(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        push(`/cars/${response.value.carId}/contract`);
      }
    },
    onError(error: Error) {
      toastError(error);
    },
  })

  const deleteInspectionSchedule = useMutation({
    mutationKey: ["delete-inspection-schedules"],
    mutationFn: (id: string) => DeleteInspectionSchedules(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["inspection-schedules"] });
      }
    }
  });
  return {
    createInspectionSchedule,
    rejectInspectionSchedule,
    approveInspectionSchedule,
    updateContractFromScheduleInfo,
    deleteInspectionSchedule
  }
}

