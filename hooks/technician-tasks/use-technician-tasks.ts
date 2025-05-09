import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApproveTechnicianTask,
  GetTechnicianTasks,
  InProgressTechnicianTask,
  RejectTechnicianTask,
} from "@/app/(dashboard)/(technicians)/technician-todo/action";
import { useDialogStore } from "@/stores/store";
import { BaseResponse } from "@/constants/responses/base-response";
import {
  TechnicianTaskRequest,
  TechnicianTaskResponse,
} from "@/constants/models/technician-task.model";
import { toastError, toastResponse } from "@/lib/toast-error";
import { useRouter } from "next/navigation";

export const useTechnicianTaskQuery = (
  params?: Partial<TechnicianTaskRequest>
) => {
  const listTechnicianTasks = useQuery({
    queryKey: ["tasks", params],
    queryFn: () => GetTechnicianTasks(params),
    initialData: BaseResponse<TechnicianTaskResponse>,
    retry: 1,
  });

  return { listTechnicianTasks };
};

export const useTechnicianTaskMutation = () => {
  const { push } = useRouter();
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();
  const rejectTechnicianTask = useMutation({
    mutationKey: ["rejectTechnicianTask"],
    mutationFn: async ({ id, note }: { id: string; note: string }) =>
      await RejectTechnicianTask(id, note),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  const approveTechnicianTask = useMutation({
    mutationKey: ["rejectTechnicianTask"],
    mutationFn: async ({ id, note }: { id: string; note: string }) =>
      await ApproveTechnicianTask(id, note),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  const inProgressTechnicianTask = useMutation({
    mutationKey: ["inprogressTechnicianTask"],
    mutationFn: async ({ id }: { id: string }) =>
      await InProgressTechnicianTask(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        push("/statistics");
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  return {
    rejectTechnicianTask,
    approveTechnicianTask,
    inProgressTechnicianTask,
  };
};
