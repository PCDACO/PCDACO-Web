import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ManufacturerApi } from "@/domains/services/manufacturers/manufacturer.service";
import { useGetManufacturersRequest, useUpdateManufacturerRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

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
    const { setIndex, setKeyword, refetch } = useGetManufacturersRequest();
    const { name, id, setName } = useUpdateManufacturerRequest()
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
        mutationFn: () => ManufacturerApi.updateManufacturer(id, name),
        onSuccess: (data) => {
            if (!data.isSuccess) return;
            toast({
                title: data.message
            })
            setIndex(1);
            setKeyword("");
            refetch?.()
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
                <DialogTitle className="text-xl text-start font-semibold">Cập nhật nhà sản xuất</DialogTitle>
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