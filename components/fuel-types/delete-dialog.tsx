import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FuelTypesApi } from "@/domains/services/fuel-types/fuelTypes.service";
import { useDeleteFuelTypeRequest, useGetFuelTypesRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";

interface DeleteDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export const FuelTypeDeleteDialog = (
    {
        isOpen,
        onClose,
    }: DeleteDialogProps
) => {
    const { setIndex, setKeyword, refetch } = useGetFuelTypesRequest();
    const { id } = useDeleteFuelTypeRequest();
    const mutation = useMutation({
        mutationFn: () => FuelTypesApi.deleteFuelTypes(id),
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
                    <DialogTitle>Bạn có muốn xóa không ?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onClose} type="submit">
                        {
                            mutation.isPending ? <LoadingSpinner size={18} />
                                : "Không"
                        }
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