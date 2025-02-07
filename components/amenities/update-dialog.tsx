import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetAmenitiesRequest, useUpdateAmenityRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UpdateAmenity } from "@/app/(dashboard)/amenities/action";

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
    const { name, description, icon, id } = useUpdateAmenityRequest()
    const { register, handleSubmit, setValue, watch } = useForm<{
        formName: string;
        formDescription: string;
        image: FileList | undefined;
    }>({
        defaultValues: {
            formName: name,
            formDescription: description,
            image: icon
        }
    });
    const selectedFile = watch("image");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        setValue("formName", name);
        setValue("formDescription", description);
        console.log(icon)
        setValue("image", icon);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, description, icon])

    useEffect(() => {
        if (selectedFile && selectedFile.length > 0) {
            setPreviewUrl(URL.createObjectURL(selectedFile[0]));
        }
    }, [selectedFile]);

    useEffect(() => {
        if (icon && icon.length > 0) {
            const file = icon[0];
            setPreviewUrl(URL.createObjectURL(file));
            setValue("image", icon); // ✅ Set initial value
        }
    }, [icon, setValue]);

    const { isPending, mutate } = useMutation({
        mutationFn: ({ name, description, icon }: {
            name: string;
            description: string;
            icon: FileList | undefined;
        }) => UpdateAmenity({ id, name, description, icon: icon }),
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
                    mutate({
                        name: data.formName,
                        description: data.formDescription,
                        icon: data.image
                    });
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
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Mô tả
                        </Label>
                        <Input
                            {...register("image")}
                            type="file"
                            id="image"
                            // accept="image/svg+xml"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                        />
                        {previewUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={previewUrl} alt="Preview" className="w-24 h-24 mt-2 rounded-lg border border-gray-300" />
                        )}
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