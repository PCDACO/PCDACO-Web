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
import { FuelTypesApi } from "@/domains/services/fuel-types/fuelTypes.service";
import { useGetFuelTypesRequest, useUpdateFuelTypeRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

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
    const mutation = useMutation({
        mutationFn: () => FuelTypesApi.updateFuelTypes(id, name),
        onSuccess: (data) => {
            toast({
                title: data.message
            })
            setIndex(1);
            setKeyword("");
            refetch?.();
            onClose();
        },
        onError: (error) => {
            console.error("Failed !", error);
        }
    }
    );
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật loại nhiên liệu</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Tên
                        </Label>
                        <Input id="name" onChange={(e) => setName(e.target.value)} value={name} className="col-span-3" />
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
                                : "Cập nhật"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}