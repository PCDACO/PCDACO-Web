import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ManufacturerApi } from "@/domains/services/manufacturer.service.ts/manufacturer.service";
import { useDeleteManufacturerRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

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
    const { id } = useDeleteManufacturerRequest();
    const mutation = useMutation({
        mutationFn: () => ManufacturerApi.deleteManufacturer(id),
        onSuccess: (data) => {
            toast({
                title: data.message
            })
            window.location.reload();
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
                        {
                            mutation.isPending
                                ? (<div className="flex justify-center items-center space-x-2 animate-pulse">
                                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                                </div>)
                                : "No"
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
                                : "Yes"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}