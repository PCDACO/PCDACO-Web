import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetFuelTypesRequest, useUpdateFuelTypeRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { UpdateFuelType } from "@/app/(dashboard)/fuel-types/action";

interface UpdateDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export const FuelTypeUpdateDialog = (
    {
        isOpen,
        onClose
    }: UpdateDialogProps
) => {
    const { setIndex, setKeyword, refetch } = useGetFuelTypesRequest();
    const { name, id, setName } = useUpdateFuelTypeRequest();
    const { register, handleSubmit, setValue } = useForm<{ formName: string }>({
        defaultValues: {
            formName: name
        }
    });

    useEffect(() => {
        setValue("formName", name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name])
    const { isPending, mutate } = useMutation({
        mutationFn: () => UpdateFuelType({ id, name }),
        onSuccess: (data) => {
            if (!data.isSuccess) return;
            toast({
                title: data.message
            })
            setIndex(1);
            setKeyword("");
            refetch?.();
            onClose();
        }
    }
    );
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="text-xl text-start font-semibold">Cập nhật loại nhiên liệu</DialogTitle>
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