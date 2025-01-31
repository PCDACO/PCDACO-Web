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
import { AmenitiyApi } from "@/domains/services/amenities/amenities.service";
import { useGetAmenitiesRequest, useGetAmenitiesResponses, useUpdateAmenityRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface DeleteDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export const AmenityUpdateDialog = (
    {
        isOpen,
        onClose,
    }: DeleteDialogProps
) => {
    const [IsEnable, SetIsEnable] = useState(false);
    const { index, size, keyword, setIndex, setKeyword } = useGetAmenitiesRequest();
    const { name, description, id, setName, setDescription } = useUpdateAmenityRequest()
    const { setItems, setHasNext, setPageNumber, setPageSize, setTotalItems } = useGetAmenitiesResponses();
    const query = useQuery({
        queryKey: ["amenities", index, size, keyword],
        queryFn: () =>
            AmenitiyApi.getAmenities(index, size, keyword).then((res) => {
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
        mutationFn: () => AmenitiyApi.updateAmenity(id, name, description),
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
                    <DialogTitle>Update Amenity</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Name
                        </Label>
                        <Input id="name" onChange={(e) => setName(e.target.value)} value={name} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input id="description" onChange={(e) => setDescription(e.target.value)} value={description} className="col-span-3" />
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