import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ManufacturerApi } from "@/domains/services/manufacturer.service.ts/manufacturer.service";
import { useDeleteManufacturerRequest, useGetManufacturersRequest, useGetManufacturersResponses, useUpdateManufacturerRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
    const [IsEnable, SetIsEnable] = useState(false);
    const { index, size, keyword, setIndex, setKeyword } = useGetManufacturersRequest();
    const { setItems, setHasNext, setPageNumber, setPageSize, setTotalItems } = useGetManufacturersResponses();
    const query = useQuery({
        queryKey: ["manufacturers", index, size, keyword],
        queryFn: () =>
            ManufacturerApi.getManufacturers(index, size, keyword).then((res) => {
                setItems(res.value!.items);
                setHasNext(res.value!.hasNext);
                setPageNumber(res.value!.pageNumber);
                setPageSize(res.value!.pageSize);
                setTotalItems(res.value!.totalItems);
                query.isSuccess = false;
                SetIsEnable(false);
                return res.value!;
            }),
        enabled: IsEnable
    })
    const { id } = useDeleteManufacturerRequest();
    const mutation = useMutation({
        mutationFn: () => ManufacturerApi.deleteManufacturer(id),
        onSuccess: (data) => {
            toast({
                title: data.message
            })
            setIndex(1);
            setKeyword("");
            SetIsEnable(true);
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