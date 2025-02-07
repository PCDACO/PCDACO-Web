import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateTransmissionRequest, useGetTransmissionsRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation, } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useForm } from "react-hook-form";
import { CreateTransmission } from "@/app/(dashboard)/transmissions/action";


export const TransmissionDialog = () => {
    const [isOpen, SetIsOpen] = useState(false);
    const { setIndex, setKeyword, refetch } = useGetTransmissionsRequest();
    const { name, setName } = useCreateTransmissionRequest()
    const { register, handleSubmit } = useForm<{
        formName: string;
    }>();

    const { isPending, mutate } = useMutation({
        mutationFn: () => CreateTransmission(name),
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
                <Button onClick={() => SetIsOpen(true)} variant="outline">Tạo mới</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="text-xl text-start font-semibold">Cập nhật tiện nghi</DialogTitle>
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