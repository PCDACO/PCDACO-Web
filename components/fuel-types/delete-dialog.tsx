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
                        {
                            mutation.isPending
                                ? (<div className="flex justify-center items-center space-x-2 animate-pulse">
                                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                                </div>)
                                : "Không"
                        }
                    </Button>
                    <Button onClick={() => mutation.mutate()} type="submit">
                        {
                            mutation.isPending
                                ? (<div className="flex justify-center items-center space-x-2 animate-pulse">
                                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                                </div>)
                                : "Có"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}