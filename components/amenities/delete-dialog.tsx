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
import { QueryClient, useMutation } from "@tanstack/react-query";

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
    const { setIndex, setKeyword } = useGetAmenitiesRequest();
    const { id } = useDeleteAmenityRequest()
    const queryClient = new QueryClient();
    const mutation = useMutation({
        mutationFn: () => AmenitiyApi.deleteAmenity(id),
        onSuccess: (data) => {
            console.log("data", data);
            toast({
                title: data.message
            })
            setIndex(1);
            setKeyword("");
            queryClient.invalidateQueries({
                queryKey: ["amenities"]
            })
            onClose();
        },
        onError: (error) => {
            console.error("Lỗi", error);
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