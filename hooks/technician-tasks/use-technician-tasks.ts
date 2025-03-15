import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  ApproveTechnicianTask,
  GetTechnicianTasks,
  RejectTechnicianTask,
} from "@/app/(dashboard)/(technicians)/technician-todo/action";
import { useDialogStore } from "@/stores/store";
import { toast } from "../use-toast";

export const useTechnicianTaskQuery = () => {
  const listTechnicianTasks = useQuery({
    queryKey: ["tasks"],
    queryFn: () => GetTechnicianTasks(),
  });

  return { listTechnicianTasks };
};

export const useTechnicianTaskMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = new QueryClient();
  const rejectTechnicianTask = useMutation({
    mutationKey: ["rejectTechnicianTask"],
    mutationFn: async ({ id, note }: { id: string; note: string }) => {
      await RejectTechnicianTask(id, note);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Xóa thành công" });
      queryClient.refetchQueries({ queryKey: "tasks" });
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
      queryClient.refetchQueries({ queryKey: "tasks" });
    },
    onError: () => {
      toast({ title: "Không thể xóa mẫu này" });
    },
  });

  return {
    rejectTechnicianTask,
    approveTechnicianTask,
  };
};
