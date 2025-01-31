import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ManufacturerApi } from "@/domains/services/manufacturer.service.ts/manufacturer.service";
import { useGetManufacturersRequest, useGetManufacturersResponses, useUpdateManufacturerRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface UpdateDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export const ManufacturerUpdateDialog = (
    {
        isOpen,
        onClose
    }: UpdateDialogProps
) => {
    const [IsEnable, SetIsEnable] = useState(false);
    const { index, size, keyword, setIndex, setKeyword } = useGetManufacturersRequest();
    const { setItems, setHasNext, setPageNumber, setPageSize, setTotalItems } = useGetManufacturersResponses();
    const { name, id, setName } = useUpdateManufacturerRequest()
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
    const mutation = useMutation({
        mutationFn: () => ManufacturerApi.updateManufacturer(id, name),
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
                    <DialogTitle>Update Manufacturer</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Name
                        </Label>
                        <Input id="name" onChange={(e) => setName(e.target.value)} value={name} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => mutation.mutate()} type="submit">
                        {
                            mutation.isPending
                                ? (<div className="flex justify-center items-center space-x-2 animate-pulse">
                                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                                </div>)
                                : "Update"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}