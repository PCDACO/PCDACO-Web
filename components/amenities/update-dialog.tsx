import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AmenitiyApi } from "@/domains/services/amenities/amenities.service";
import { useGetAmenitiesRequest, useUpdateAmenityRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

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
    const { setIndex, setKeyword, refetch } = useGetAmenitiesRequest();
    const { name, description, id, setName, setDescription } = useUpdateAmenityRequest()
    const { register, handleSubmit, setValue } = useForm<{
        formName: string;
        formDescription: string;
        // image: Blob;
    }>({
        defaultValues: {
            formName: name,
            formDescription: description
        }
    });

    useEffect(() => {
        setValue("formName", name);
        setValue("formDescription", description);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, description])

    const { isPending, mutate } = useMutation({
        mutationFn: () => AmenitiyApi.updateAmenity(id, name, description),
        onSuccess: (data) => {
            if (!data.isSuccess) return;
            onClose();
            setIndex(1);
            setKeyword("");
            refetch?.();
            toast({
                title: data.message
            })
        }
    }
    );
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="text-xl text-start font-semibold">Cập nhật tiện nghi</DialogTitle>
                <form onSubmit={handleSubmit((data) => {
                    setName(data.formName);
                    setDescription(data.formDescription);
                    mutate();
                })} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Tên
                        </Label>
                        <Input
                            {...register("formName", { value: name })}
                            type="text"
                            id="name"
                            placeholder="Nhập "
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Mô tả
                        </Label>
                        <Input
                            {...register("formDescription")}
                            type="text"
                            id="formDescription"
                            placeholder="Nhập mô tả"
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                        />
                    </div>
                    {/* <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                            Mô tả
                                        </Label>
                                        <Input
                                            {...register("image")}
                                            type="file"
                                            id="image"
                                            placeholder="Nhập ảnh"
                                            required
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                                        />
                                    </div> */}
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