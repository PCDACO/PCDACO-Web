import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApproveTechnicianTask,
  GetTechnicianTasks,
  InProgressTechnicianTask,
  RejectTechnicianTask,
} from "@/app/(dashboard)/(technicians)/technician-todo/action";
import { useDialogStore } from "@/stores/store";
import { BaseResponse } from "@/constants/responses/base-response";
import { TechnicianTaskResponse } from "@/constants/models/technician-task.model";
import { toastError, toastResponse } from "@/lib/toast-error";

export const useTechnicianTaskQuery = () => {
  const listTechnicianTasks = useQuery({
    queryKey: ["tasks"],
    queryFn: () => GetTechnicianTasks(),
    initialData: BaseResponse<TechnicianTaskResponse>,
    retry: 1
  });

  return { listTechnicianTasks };
};

export const useTechnicianTaskMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();
  const rejectTechnicianTask = useMutation({
    mutationKey: ["rejectTechnicianTask"],
    mutationFn: async ({ id, note }: { id: string; note: string }) => await RejectTechnicianTask(id, note),
    onSuccess: (response) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: "tasks" });
      toastResponse(response);
    },
    onError: (error) => {
      toastError(error);
    },
  });

  const approveTechnicianTask = useMutation({
    mutationKey: ["rejectTechnicianTask"],
    mutationFn: async ({ id, note }: { id: string; note: string }) => await ApproveTechnicianTask(id, note),
    onSuccess: (response) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: "tasks" });
      toastResponse(response);
    },
    onError: (error) => {
      toastError(error);
    },
  });

  const inProgressTechnicianTask = useMutation({
    mutationKey: ["rejectTechnicianTask"],
    mutationFn: async ({ id }: { id: string }) => await InProgressTechnicianTask(id),
    onSuccess: (response) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: "tasks" });
      toastResponse(response);
    },
    onError: (error) => {
      toastError(error);
    },
  });

  return {
    rejectTechnicianTask,
    approveTechnicianTask,
    inProgressTechnicianTask,
  };
};
