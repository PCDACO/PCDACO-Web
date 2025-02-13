"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { UpdateModels } from "@/app/(dashboard)/manufacturers/[id]/models/action";
import { useGetManufacturersResponses, useGetModelsRequest, useUpdateModelRequest } from "@/domains/stores/store";
import { GetManufacturers } from "@/app/(dashboard)/manufacturers/action";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { GetManufacturersResponses } from "@/domains/models/manufacturers/getManufacturers.response";
import { z } from "zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { updateFormSchema } from "@/domains/schemas/models/updateForm.schema";
import { useEffect } from "react";
import ManufacturerSelect from "./manufacturer-select";
import ModelDateTimePicker from "./date-time-picker";
import { Button } from "../ui/button";
import { LoadingSpinner } from "../ui/loading-spinner";

interface DeleteDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export const ModelUpdateDialog = (
    {
        isOpen,
        onClose,
    }: DeleteDialogProps
) => {
    const { items, setItems } = useGetManufacturersResponses();
    const { setIndex, setKeyword, refetch } = useGetModelsRequest();
    const { id, name, releaseDate, manufacturerId } = useUpdateModelRequest()

    const form = useForm<z.infer<typeof updateFormSchema>>({
        resolver: zodResolver(updateFormSchema),
        defaultValues: {
            formName: name,
            formReleaseDate: releaseDate,
            formManufacturerId: manufacturerId
        },
    })
    function onSubmit(values: z.infer<typeof updateFormSchema>) {
        mutate({
            apiName: values.formName,
            apiManufacturerId: values.formManufacturerId,
            apiReleaseDate: values.formReleaseDate
        })
    }
    useQuery({
        queryKey: ["manufacturers", 1, 1000],
        queryFn: () => GetManufacturers({ index: 1, size: 1000, keyword: "" })
            .then((res) => {
                const data = res as SharedResponse<GetManufacturersResponses>
                if (!data) return;
                setItems(data.value?.items ?? [])
            })
    })

    useEffect(() => {
        form.setValue("formName", name);
        form.setValue("formReleaseDate", releaseDate);
        form.setValue("formManufacturerId", manufacturerId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, releaseDate, manufacturerId])

    const { isPending, mutate } = useMutation({
        mutationFn: ({ apiName, apiReleaseDate, apiManufacturerId }: {
            apiName: string;
            apiReleaseDate: Date;
            apiManufacturerId: string;
        }) => UpdateModels({ id, name: apiName, releaseDate: apiReleaseDate, manufacturerId: apiManufacturerId }),
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
            <DialogContent className="max-lg:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl text-start font-semibold">Cập nhật dòng xe</DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="formName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="formManufacturerId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        {/* <Input placeholder="shadcn" {...field} /> */}
                                        <ManufacturerSelect datas={items} {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="formReleaseDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <ModelDateTimePicker {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full mt-8 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            {isPending ? (<LoadingSpinner size={18} />) : "Tạo"}
                        </Button>
                    </form>
                </FormProvider >
            </DialogContent >
        </Dialog >
    );
}

