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
import { ManufacturerApi } from "@/domains/services/manufacturer.service.ts/manufacturer.service";
import { useUpdateManufacturerRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

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
    const { name, id, setName } = useUpdateManufacturerRequest()
    const mutation = useMutation({
        mutationFn: () => ManufacturerApi.updateManufacturer(id, name),
        onSuccess: (data) => {
            toast({
                title: data.message
            })
            window.location.reload();
        },
        onError: (error) => {
            console.error("Login failed", error);
        }
    }
    );
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Manufacturer</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Name
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
                                : "Update"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}