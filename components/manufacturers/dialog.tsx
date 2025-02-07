import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateManufacturerRequest, useGetManufacturersRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation, } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "../ui/loading-spinner";
import { CreateManufacturer } from "@/app/(dashboard)/manufacturers/action";


export const ManufacturerDialog = () => {
    const [isOpen, SetIsOpen] = useState(false);
    const { setIndex, setKeyword, refetch } = useGetManufacturersRequest();
    const { name, setName } = useCreateManufacturerRequest()
    const { register, handleSubmit } = useForm<{
        formName: string;
    }>();


    const { isPending, mutate } = useMutation({
        mutationFn: () => CreateManufacturer(name),
        onSuccess: (data) => {
            if (!data.isSuccess) return;
            toast({
                title: data.message
            })
            setIndex(1);
            setKeyword("");
            refetch?.();
            SetIsOpen(false);
        }
    }
    );
    return (
        <Dialog open={isOpen} onOpenChange={SetIsOpen} >
            <DialogTrigger asChild>
                <Button disabled={isPending} onClick={() => SetIsOpen(true)} variant="outline">Add</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-xl text-start font-semibold">Thêm nhà sản xuất</DialogTitle>
                <form onSubmit={handleSubmit((data) => {
                    setName(data.formName);
                    mutate();
                })} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Tên
                        </Label>
                        <Input
                            {...register("formName")}
                            type="text"
                            id="name"
                            placeholder="Nhập "
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full mt-8 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        {isPending ? (<LoadingSpinner size={18} />) : "Tạo"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog >
    );
}