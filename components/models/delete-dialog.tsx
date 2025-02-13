import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteModelRequest, useGetModelsRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { DeleteModels } from "@/app/(dashboard)/manufacturers/[id]/models/action";

interface DeleteDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export const ModelDeleteDialog = (
    {
        isOpen,
        onClose,
    }: DeleteDialogProps
) => {
    const { setIndex, setKeyword, refetch } = useGetModelsRequest();
    const { id } = useDeleteModelRequest()
    const { mutate, isPending } = useMutation({
        mutationKey: ["models"],
        mutationFn: () => DeleteModels(id),
        onSuccess: (data) => {
            if (!data.isSuccess) console.log("Some error happened");
            toast({
                title: data.message
            })
            setIndex(1);
            setKeyword("");
            refetch?.();
            onClose();
        }
    }
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Bạn có muốn xóa tiện nghi này không ?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onClose} type="submit">
                        Không
                    </Button>
                    <Button onClick={() => mutate()} type="submit">
                        {
                            isPending
                                ? <LoadingSpinner size={18} />
                                : "Có"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}