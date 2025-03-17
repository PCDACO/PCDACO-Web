"use client"
import { useState } from "react"
import CarDetailsDialog from "@/components/cars/detail-dialog"
import { useTechnicianTaskMutation, useTechnicianTaskQuery } from "@/hooks/technician-tasks/use-technician-tasks"
import { formatDate } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
export default function TechnicianTodo() {
  const [isCarDetailsOpen, setIsCarDetailsOpen] = useState(false)
  const { listTechnicianTasks } = useTechnicianTaskQuery();
  const { rejectTechnicianTask, approveTechnicianTask } = useTechnicianTaskMutation();
  const handleOpenGpsAssignment = () => {
    setIsCarDetailsOpen(false) // Optionally close the car details dialog
  }
  const [Note, SetNote] = useState<Record<string, string>>({
    "dummy": "dummy",
  });
  const handleNoteChange = (
    taskId: string,
    note: string
  ) => {
    SetNote({
      ...Note,
      [taskId]: note,
    })
  }
  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Lịch Làm Việc Trong Ngày</h1>
        <p className="text-sm text-gray-600">{formatDate(listTechnicianTasks.data?.value.inspectionDate.toString() ?? "")}</p>
        <p className="text-sm text-gray-600">Technician: {listTechnicianTasks.data?.value.technicianName}</p>
      </header>
      <main>
        <ul className="space-y-6">
          {listTechnicianTasks.data?.value.cars.map((car) => (
            <li key={car.inspectionScheduleId} className="border border-gray-300 p-4 rounded-lg hover:cursor-pointer">
              <div className="flex items-start justify-between mb-2" onClick={() => setIsCarDetailsOpen(true)}>
                <div>
                  <h2 className="font-semibold">{car.modelName}-{car.licensePlate}</h2>
                  <p className="text-sm text-gray-600">{car.inspectionAddress}</p>
                </div>
                <div>
                  <Button onClick={() => {
                    rejectTechnicianTask.mutate({
                      id: car.inspectionScheduleId,
                      note: Note[car.inspectionScheduleId] ?? "",
                    });
                    event!.stopPropagation();
                  }
                  } className=" 
                                        w-6 h-6 flex items-center justify-center p-0 border-none cursor-pointer text-xs "
                    aria-label="Reject"
                  >
                  </Button>
                  <Button onClick={() => {
                    approveTechnicianTask.mutate({
                      id: car.inspectionScheduleId,
                      note: Note[car.inspectionScheduleId] ?? "",
                    });
                    event!.stopPropagation();
                  }
                  } className=" 
                                        w-6 h-6 flex items-center justify-center p-0 border-none cursor-pointer text-xs "
                    aria-label="Reject"
                  >
                    Hoàn Thành
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor={`notes-${car.inspectionScheduleId}`} className="text-sm font-medium">
                  Notes:
                </Label>
                <Input id={`notes-${car.id}`} placeholder="Nhập note" className="mt-1"
                  onChange={(e) => handleNoteChange(car.inspectionScheduleId, e.currentTarget.value ?? "")} />
              </div>
              <CarDetailsDialog
                car={car}
                isOpen={isCarDetailsOpen}
                onClose={() => setIsCarDetailsOpen(false)}
                onOpenGpsAssignment={handleOpenGpsAssignment}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>

  )
}
