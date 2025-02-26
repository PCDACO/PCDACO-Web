"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import GpsAssignmentDialog from "../devices/assign-device"
import CarDetailsDialog from "@/components/cars/detail-dialog"
import { Button } from "@/components/ui/button"
export default function DriverTodo() {
    const [isCarDetailsOpen, setIsCarDetailsOpen] = useState(false)
    const [isGpsAssignmentOpen, setIsGpsAssignmentOpen] = useState(false);
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })
    const handleOpenGpsAssignment = () => {
        setIsGpsAssignmentOpen(true)
        setIsCarDetailsOpen(false) // Optionally close the car details dialog
    }
    const tasks = [
        { id: 1, car: "Toyota Camry 2020", address: "480/59A Đường Bình Quới Phường 28 Quận Bình Thạnh", completed: false },
        { id: 2, car: "Honda Civic 2019", address: "480/59A Đường Bình Quới Phường 28 Quận Bình Thạnh", completed: false },
        { id: 3, car: "Ford F-150 2021", address: "480/59A Đường Bình Quới Phường 28 Quận Bình Thạnh", completed: false },
        { id: 4, car: "Chevrolet Malibu 2018", address: "480/59A Đường Bình Quới Phường 28 Quận Bình Thạnh", completed: false },
    ];
    const carData = {
        id: "car123",
        modelId: "model456",
        modelName: "Sedan X",
        ownerId: "owner789",
        ownerName: "John Doe",
        ownerAvatar: "/placeholder.svg?height=64&width=64",
        licensePlate: "ABC123",
        color: "Black",
        seat: 5,
        description:
            "Comfortable and efficient sedan for city driving. Features include leather seats, panoramic sunroof, and advanced driver assistance systems.",
        transmissionType: "Automatic",
        fuelType: "Gasoline",
        fuelComsumption: 7.5,
        requiresCollateral: false,
        price: { amount: 50, currency: "USD" },
        location: {
            latitude: 40.7128,
            longitude: -74.006,
            address: "123 Main St, New York, NY 10001",
        },
        manufacturer: { id: "manu123", name: "AutoCorp" },
        images: [
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
        ],
        paperworkImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
        amenities: {
            hasAC: true,
            hasBluetooth: true,
            hasNavigation: true,
        },
    }
    return (
        <div className="min-h-screen bg-white text-black p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Car Inspection Tasks</h1>
                <p className="text-sm text-gray-600">{currentDate}</p>
                <p className="text-sm text-gray-600">Technician: John Doe</p>
            </header>
            <main>
                <ul className="space-y-6">
                    {tasks.map((task) => (
                        <li key={task.id} className="border border-gray-300 p-4 rounded-lg">
                            <div className="flex items-start justify-between mb-2" onClick={() => setIsCarDetailsOpen(true)}>
                                <div>
                                    <h2 className="font-semibold">{task.car}</h2>
                                    <p className="text-sm text-gray-600">{task.address}</p>
                                </div>
                                <div>
                                    <Button className="ml-3 bg-white text-black">Reject</Button>
                                    <Button className="ml-3 bg-white text-black">Complete</Button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Label htmlFor={`notes-${task.id}`} className="text-sm font-medium">
                                    Notes:
                                </Label>
                                <Input id={`notes-${task.id}`} placeholder="Enter inspection notes here..." className="mt-1" />
                            </div>
                            <CarDetailsDialog
                                car={carData}
                                isOpen={isCarDetailsOpen}
                                onClose={() => setIsCarDetailsOpen(false)}
                                onOpenGpsAssignment={handleOpenGpsAssignment}
                            />
                            <GpsAssignmentDialog
                                carId={carData.id}
                                licensePlate={carData.licensePlate}
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