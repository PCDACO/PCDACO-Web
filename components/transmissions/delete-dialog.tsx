import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { TransmissionApi } from "@/domains/services/transmissions/transmissions.service";
import { useDeleteTransmissionRequest, useGetTransmissionsRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";

interface TransmissionDeleteDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export const TransmissionDeleteDialog = (
    {
        isOpen,
        onClose,
    }: TransmissionDeleteDialogProps
) => {
    const { setIndex, setKeyword, refetch } = useGetTransmissionsRequest();
    const { id } = useDeleteTransmissionRequest();
    const mutation = useMutation({
        mutationFn: () => TransmissionApi.deleteTransmission(id),
        onSuccess: (data) => {
            if (!data.isSuccess) return;
            toast({
                title: data.message
            })
            setIndex(1);
            setKeyword("");
            refetch?.();
            onClose();
        },
        onError: (error) => {
            console.error("Failed !", error);
        }
    }
    );
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Bạn có muốn xóa không ?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onClose} type="submit">
                        Không
                    </Button>
                    <Button onClick={() => mutation.mutate()} type="submit">
                        {mutation.isPending ? <LoadingSpinner size={18} /> : "Có"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}