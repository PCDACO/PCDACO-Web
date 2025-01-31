import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ManufacturerApi } from "@/domains/services/manufacturer.service.ts/manufacturer.service";
import { useCreateManufacturerRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const ManufacturerDialog = () => {
    const { name, setName } = useCreateManufacturerRequest()
    const mutation = useMutation({
        mutationFn: () => ManufacturerApi.createManufacturer(name),
        onSuccess: (data) => {
            toast({
                title: data.message
            })
            window.location.reload();
        }
    }
    );
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline">Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
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
                                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                                </div>)
                                : "Save changes"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}