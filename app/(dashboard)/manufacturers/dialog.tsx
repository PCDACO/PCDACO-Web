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
import { ManufacturerApi } from "@/domains/services/manufacturer.service.ts/manufacturer.service";
import { useCreateManufacturerRequest, useGetManufacturersRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { QueryClient, useMutation, } from "@tanstack/react-query";
import { useState } from "react";


export const ManufacturerDialog = () => {
    const [isOpen, SetIsOpen] = useState(false);
    const { index, size, keyword, setIndex, setKeyword } = useGetManufacturersRequest();
    // const { setItems, setHasNext, setPageNumber, setPageSize, setTotalItems } = useGetManufacturersResponses();
    const queryClient = new QueryClient();
    const { name, setName } = useCreateManufacturerRequest()

    const handleSubmitBtn = async () => {
        if (name === "") {
            toast({
                title: "Please fill in all the fields"
            })
            return;
        }
        await mutation.mutateAsync();
    }

    const mutation = useMutation({
        mutationFn: () => ManufacturerApi.createManufacturer(name),
        onSuccess: (data) => {
            toast({
                title: data.message
            })
            setIndex(1);
            setKeyword("");
            SetIsOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["manufacturers", index, size, keyword]
            });
        }
    }
    );
    return (
        <Dialog open={isOpen} onOpenChange={SetIsOpen} >
            <DialogTrigger asChild>
                <Button onClick={() => SetIsOpen(true)} variant="outline">Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tạo</DialogTitle>
                    <DialogDescription>
                        Tạo thêm nhà sản xuất ở đây
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" onChange={(e) => setName(e.target.value)} value={name} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmitBtn} type="submit">
                        {
                            mutation.isPending
                                ? (<div className="flex justify-center items-center space-x-2 animate-pulse">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
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