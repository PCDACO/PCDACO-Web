import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApproveTechnicianTask,
  GetTechnicianTasks,
  InProgressTechnicianTask,
  RejectTechnicianTask,
} from "@/app/(dashboard)/(technicians)/technician-todo/action";
import { useDialogStore } from "@/stores/store";
import { toast } from "../use-toast";
import { BaseResponse } from "@/constants/responses/base-response";
import { TechnicianTaskResponse } from "@/constants/models/technician-task.model";

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
    mutationFn: async ({ id, note }: { id: string; note: string }) => {
      await RejectTechnicianTask(id, note);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Xóa thành công" });
      queryClient.invalidateQueries({ queryKey: "tasks" });
    },
    onError: () => {
      toast({ title: "Không thể xóa mẫu này" });
    },
  });

  const approveTechnicianTask = useMutation({
    mutationKey: ["rejectTechnicianTask"],
    mutationFn: async ({ id, note }: { id: string; note: string }) => {
      await ApproveTechnicianTask(id, note);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Cập nhật thành công" });
      queryClient.invalidateQueries({ queryKey: "tasks" });
    },
    onError: () => {
      toast({ title: "Không thể xóa mẫu này" });
    },
  });

  const inProgressTechnicianTask = useMutation({
    mutationKey: ["rejectTechnicianTask"],
    mutationFn: async ({ id }: { id: string }) => {
      await InProgressTechnicianTask(id);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Cập nhật thành công" });
      queryClient.invalidateQueries({ queryKey: "tasks" });
    },
    onError: () => {
      toast({ title: "Không thể xóa mẫu này" });
    },
  });

  return {
    rejectTechnicianTask,
    approveTechnicianTask,
    inProgressTechnicianTask,
  };
};
