import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function DriverTodo() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const tasks = [
        { id: 1, car: "Toyota Camry 2020", type: "Full Inspection", completed: false },
        { id: 2, car: "Honda Civic 2019", type: "Brake Check", completed: false },
        { id: 3, car: "Ford F-150 2021", type: "Engine Diagnostics", completed: false },
        { id: 4, car: "Chevrolet Malibu 2018", type: "Tire Rotation", completed: false },
    ]
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
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h2 className="font-semibold">{task.car}</h2>
                                    <p className="text-sm text-gray-600">{task.type}</p>
                                </div>
                                <Checkbox id={`task-${task.id}`} />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor={`notes-${task.id}`} className="text-sm font-medium">
                                    Notes:
                                </Label>
                                <Input id={`notes-${task.id}`} placeholder="Enter inspection notes here..." className="mt-1" />
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}