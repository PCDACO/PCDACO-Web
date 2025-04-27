import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateInspectionSchedules,
  DeleteInspectionSchedules,
  GetCurrentTechnicianInspectionSchedules,
  GetInProgressInspectionSchedule,
  GetInspectionSchedules,
  RejectInspectionSchedules,
  UpdateInspectionSchedule,
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
import { ApproveInspectionScheduleAction, approveInspectionScheduleIncidentAction, approveInspectionScheduleNoPhotoAction } from "@/app/(dashboard)/(technicians)/technician-todo/approve/action";
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

  const listCurrentInspectionSchedules = useQuery({
    queryKey: ["inspection-schedules"],
    queryFn: () => GetCurrentTechnicianInspectionSchedules({ month: params.month, year: params.year }),
    initialData: BaseResponse<InspectionScheduleDetail[]>,
  });

  const inProgressInspectionSchedule = useQuery({
    queryKey: ["inspection-schedules", "in-progress"],
    queryFn: () => GetInProgressInspectionSchedule(),
    initialData: BaseResponse<InProgressInspectionScheduleResponse>,
  });

  return { listInspectionSchedules, listCurrentInspectionSchedules, inProgressInspectionSchedule };
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

  const updateInspectionSchedule = useMutation({
    mutationKey: ["reassign-schedules"],
    mutationFn: ({
      id, payload
    }: {
      id: string,
      payload: InspectionSchedulePayload,
    }) => UpdateInspectionSchedule({ id, payload }),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["inspection-schedules"] });
      }
    },
    onError: (error: Error) => {
      toastError(error);
    }
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
        push("/statistics");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  const approveInspectionSchedule = useMutation({
    mutationKey: ["rejectInspectionSchedule"],
    mutationFn: ({
      id, payload
    }: {
      id: string,
      payload: CarInspectionSchedulePayload
    }) => ApproveInspectionScheduleAction(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["inspection-schedules"] });
        push("/statistics");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  const approveInspectionScheduleNoPhotos = useMutation({
    mutationKey: ["rejectInspectionSchedule"],
    mutationFn: ({
      id, note
    }: {
      id: string,
      note: string
    }) => approveInspectionScheduleNoPhotoAction({ id, note }),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["inspection-schedules"] });
        push("/statistics");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  const approveInspectionScheduleIncident = useMutation({
    mutationKey: ["rejectInspectionSchedule"],
    mutationFn: ({
      id,
      note,
      images
    }: {
      id: string,
      note: string,
      images: FileList | null;
    }) => approveInspectionScheduleIncidentAction({ id, note, images }),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["inspection-schedules"] });
        push("/statistics");
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
    deleteInspectionSchedule,
    updateInspectionSchedule,
    approveInspectionScheduleNoPhotos,
    approveInspectionScheduleIncident
  }
}

