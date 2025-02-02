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
import { TransmissionApi } from "@/domains/services/transmissions/transmissions.service";
import { useGetTransmissionsRequest, useUpdateTransmissionRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { QueryClient, useMutation } from "@tanstack/react-query";

interface TransmissionUpdateDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export const TransmissionUpdateDialog = (
    {
        isOpen,
        onClose
    }: TransmissionUpdateDialogProps
) => {
    const { setIndex, setKeyword } = useGetTransmissionsRequest();
    const { name, id, setName } = useUpdateTransmissionRequest();
    const useQueryClient = new QueryClient();
    const mutation = useMutation({
        mutationFn: () => TransmissionApi.updateTransmission(id, name),
        onSuccess: (data) => {
            toast({
                title: data.message
            })
            setIndex(1);
            setKeyword("");
            useQueryClient.invalidateQueries({
                queryKey: ["fuel-types"]
            })
            onClose();
        },
        onError: (error) => {
            console.error("Failed !", error);
        }
    }
    );
    console.log("name", name);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật loại truyền động</DialogTitle>
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