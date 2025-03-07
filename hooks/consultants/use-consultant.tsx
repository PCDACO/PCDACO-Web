import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { useDialogStore } from "@/stores/store";
import { ConsultantParams, ConsultantPayload } from "@/constants/models/consultant.model";
import { CreateConsultant, GetConsultants } from "@/app/(dashboard)/(admin)/consultants/action";
import { useRouter } from "next/navigation";

export const useConsultantQuery = ({ params }: {
    params: ConsultantParams
}) => {
    const listConsultants = useQuery({
        queryKey: ["consultants", params],
        queryFn: () => GetConsultants(params)
    });
    return { listConsultants };
}
export const useConsultantMutation = () => {
    const { setOpen } = useDialogStore();
    const { replace } = useRouter();
    const queryClient = new QueryClient();
    const createConsultant = useMutation({
        mutationKey: ["createConsultant"],
        mutationFn: (payload: ConsultantPayload) => CreateConsultant(payload),
        onSuccess: () => {
            setOpen(false);
            queryClient.refetchQueries({ queryKey: "consultants" });
            replace("/consultants");
        },
        onError: () => {
            toast({ title: "Failed to create consultants" })
        }
    });
    return {
        createConsultant
    }
}