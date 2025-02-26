"use client"
import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useGPSDeviceQuery } from "@/hooks/gps-device/use-gps-device"
import { useAssignDeviceForm } from "@/hooks/assign-device/use-form-assign-device"
import { Form } from "@/components/ui/form"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useEffect } from "react"
import { useGeolocation } from "@/lib/getCurrentLocation"


interface GpsAssignmentDialogProps {
    carId: string,
    licensePlate: string
    isOpen: boolean
    onClose: () => void
}
const params = {
    index: 1,
    size: 1000,
    keyword: ''
}
export default function GpsAssignmentDialog({ carId, licensePlate, isOpen, onClose }: GpsAssignmentDialogProps) {
    const { form, isLoading, onSubmit } = useAssignDeviceForm({
        id: carId,
        value: {
            carId: carId,
            deviceId: "",
            latitude: 0,
            longtitude: 0
        },
    });
    const { listGPSDeviceQuery } = useGPSDeviceQuery({
        params
    });

    const location = useGeolocation();
    useEffect(() => {
        if (!location) return;
        form.setValue("latitude", location.latitude ?? 0);
        form.setValue("longtitude", location.longitude ?? 0);
        console.log(location);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Assign GPS Device</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="mb-6">
                            <label htmlFor="carId" className="block text-sm font-medium text-gray-700 mb-1">
                                Select GPS Device
                            </label>
                            <select
                                id="carId"
                                name="carId"
                                className="w-full p-2 border border-gray-300 rounded-md text-black bg-white"
                                required
                                disabled={true}
                            >
                                <option value={carId}>{licensePlate}</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="deviceId" className="block text-sm font-medium text-gray-699 mb-1">
                                Select GPS Device
                            </label>
                            <select
                                id="deviceId"
                                name="deviceId"
                                className="w-full p-2 border border-gray-300 rounded-md text-black bg-white"
                                required
                            >
                                <option value="">Select a GPS device</option>
                                {listGPSDeviceQuery.data?.value.items.map((device) => (
                                    <option key={device.id} value={device.id}>
                                        {device.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <DialogFooter className="mt-6">
                            <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                                {isLoading ? (<LoadingSpinner />) : "Assign GPS Device"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}



