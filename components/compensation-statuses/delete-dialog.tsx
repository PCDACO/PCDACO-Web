import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AmenitiyApi } from "@/domains/services/amenities/amenities.service";
import { useDeleteAmenityRequest, useGetAmenitiesRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";

interface DeleteDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export const AmenityDeleteDialog = (
    {
        isOpen,
        onClose,
    }: DeleteDialogProps
) => {
    const { setIndex, setKeyword, refetch } = useGetAmenitiesRequest();
    const { id } = useDeleteAmenityRequest()
    const mutation = useMutation({
        mutationFn: () => AmenitiyApi.deleteAmenity(id),
        onSuccess: (data) => {
            if (!data.isSuccess) return;
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
                    <Button onClick={() => mutation.mutate()} type="submit">
                        {
                            mutation.isPending
                                ? <LoadingSpinner size={18} />
                                : "Có"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}