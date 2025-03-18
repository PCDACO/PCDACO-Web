import { CreateTechnicians, GetTechnicians } from "@/app/(dashboard)/(admin)/technicians/action";
import { TechnicianParams, TechnicianPayload } from "@/constants/models/technician.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { useDialogStore } from "@/stores/store";
import { useRouter } from "next/navigation";

export const useTechnicianQuery = ({ params }: {
  params: TechnicianParams
}) => {
  const listTechnicians = useQuery({
    queryKey: ["technicians", params],
    queryFn: () => GetTechnicians(params),
    retry: 1
  });
  return { listTechnicians };
}
export const useTechnicianMutation = () => {
  const { setOpen } = useDialogStore();
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const createTechnician = useMutation({
    mutationKey: ["createTechnician"],
    mutationFn: (payload: TechnicianPayload) => CreateTechnicians(payload),
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: "technicians" });
      replace("/technicians");
    },
    onError: () => {
      toast({ title: "Failed to create technicians" })
    }
  });
  return {
    createTechnician
  }
}
