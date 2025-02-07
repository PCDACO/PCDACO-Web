import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteManufacturerRequest, useGetManufacturersRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { DeleteAmenity } from "@/app/(dashboard)/amenities/action";

interface DeleteDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export const ManufacturerDeleteDialog = (
    {
        isOpen,
        onClose,
    }: DeleteDialogProps
) => {
    const { setIndex, setKeyword, refetch } = useGetManufacturersRequest();
    const { id } = useDeleteManufacturerRequest();
    const mutation = useMutation({
        mutationFn: () => DeleteAmenity(id),
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
            console.error("Login failed", error);
        }
    }
    );
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Do you want to delete ?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onClose} type="submit">
                        Không
                    </Button>
                    <Button onClick={() => mutation.mutate()} type="submit">
                        {mutation.isPending ? <LoadingSpinner /> : "Có"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}