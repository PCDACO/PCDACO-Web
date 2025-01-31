import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AmenitiyApi } from "@/domains/services/amenities/amenities.service";
import { useCreateAmenitiesRequest, useGetAmenitiesRequest, useGetAmenitiesResponses } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const AmenityDialog = () => {
    const [isOpen, SetIsOpen] = useState(false);
    const [IsEnable, SetIsEnable] = useState(false);
    const { index, size, keyword, setIndex, setKeyword } = useGetAmenitiesRequest();
    const { setItems, setHasNext, setPageNumber, setPageSize, setTotalItems } = useGetAmenitiesResponses();
    useQuery({
        queryKey: ["manufacturers", index, size, keyword],
        queryFn: () =>
            AmenitiyApi.getAmenities(index, size, keyword).then((res) => {
                setItems(res.value!.items);
                setHasNext(res.value!.hasNext);
                setPageNumber(res.value!.pageNumber);
                setPageSize(res.value!.pageSize);
                setTotalItems(res.value!.totalItems);
                SetIsEnable(false);
                return res.value!;
            }),
        enabled: IsEnable
    })
    const { name, description, setName, setDescription } = useCreateAmenitiesRequest()

    const handleSubmitBtn = async () => {
        if (name === "" || description === "") {
            toast({
                title: "Please fill in all the fields"
            })
            return;
        }
        await mutation.mutateAsync();
    }

    const mutation = useMutation({
        mutationFn: () => AmenitiyApi.createAmenities(name, description),
        onSuccess: (data) => {
            toast({
                title: data.message
            })
            setIndex(1);
            setKeyword("");
            SetIsOpen(false);
            SetIsEnable(true);
        }
    }
    );
    return (
        <Dialog open={isOpen} onOpenChange={SetIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => SetIsOpen(true)} variant="outline">Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
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
                    <Button onClick={handleSubmitBtn} type="submit">
                        {
                            mutation.isPending
                                ? (<div className="flex justify-center items-center space-x-2 animate-pulse">
                                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                                </div>)
                                : "Save changes"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}