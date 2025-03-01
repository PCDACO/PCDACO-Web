import { useQuery } from "@tanstack/react-query";
import { GetTechnicianTasks } from "@/app/(dashboard)/(technicians)/technician-todo/action";

export const useTechnicianTaskQuery = () => {
  const listTechnicianTasks = useQuery({
    queryKey: ["tasks"],
    queryFn: () => GetTechnicianTasks(),
  });

  return { listTechnicianTasks };
};
