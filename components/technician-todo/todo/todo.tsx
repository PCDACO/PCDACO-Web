"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import GpsAssignmentDialog from "../devices/assign-device"
import CarDetailsDialog from "@/components/cars/detail-dialog"
import { Button } from "@/components/ui/button"
import { useTechnicianTaskQuery } from "@/hooks/technician-tasks/use-technician-tasks"
import { formatDate } from "@/lib/utils"
export default function TechnicianTodo() {
    const [isCarDetailsOpen, setIsCarDetailsOpen] = useState(false)
    const [isGpsAssignmentOpen, setIsGpsAssignmentOpen] = useState(false);
    const { listTechnicianTasks } = useTechnicianTaskQuery();
    const handleOpenGpsAssignment = () => {
        setIsGpsAssignmentOpen(true)
        setIsCarDetailsOpen(false) // Optionally close the car details dialog
    }
    return (
        <div className="min-h-screen bg-white text-black p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Car Inspection Tasks</h1>
                <p className="text-sm text-gray-600">{formatDate(listTechnicianTasks.data?.value.inspectionDate.toString() ?? "")}</p>
                <p className="text-sm text-gray-600">Technician: {listTechnicianTasks.data?.value.technicianName}</p>
            </header>
            <main>
                <ul className="space-y-6">
                    {listTechnicianTasks.data?.value.cars.map((car) => (
                        <li key={car.id} className="border border-gray-300 p-4 rounded-lg">
                            <div className="flex items-start justify-between mb-2" onClick={() => setIsCarDetailsOpen(true)}>
                                <div>
                                    <h2 className="font-semibold">{car.licensePlate}</h2>
                                    <p className="text-sm text-gray-600">{car.inspectionAddress}</p>
                                </div>
                                <div>
                                    <Button className="ml-3 bg-white text-black">Reject</Button>
                                    <Button className="ml-3 bg-white text-black">Complete</Button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Label htmlFor={`notes-${car.id}`} className="text-sm font-medium">
                                    Notes:
                                </Label>
                                <Input id={`notes-${car.id}`} placeholder="Enter inspection notes here..." className="mt-1" />
                            </div>
                            <CarDetailsDialog
                                car={car}
                                isOpen={isCarDetailsOpen}
                                onClose={() => setIsCarDetailsOpen(false)}
                                onOpenGpsAssignment={handleOpenGpsAssignment}
                            />
                            <GpsAssignmentDialog
                                carId={car.id}
                                licensePlate={car.licensePlate}
                                isOpen={isGpsAssignmentOpen}
                                onClose={() => {
                                    setIsGpsAssignmentOpen(false)
                                    setIsCarDetailsOpen(true)
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </main>
        </div>

    )
}