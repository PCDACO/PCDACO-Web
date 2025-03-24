"use client"
import { useState } from "react"
import CarDetailsDialog from "@/components/cars/detail-dialog"
import { useTechnicianTaskMutation } from "@/hooks/technician-tasks/use-technician-tasks"
import { formatDate } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TechnicianTaskResponse } from "@/constants/models/technician-task.model"

interface Props {
  tasks: TechnicianTaskResponse;
}
export default function TechnicianTodo({ tasks }: Props) {
  const [isCarDetailsOpen, setIsCarDetailsOpen] = useState(false)
  const { rejectTechnicianTask, inProgressTechnicianTask } = useTechnicianTaskMutation();
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
        <h1 className="text-2xl font-bold mb-4">Lịch Làm Việc Trong Ngày</h1>
        <Badge className="text-sm text-white mr-4"> {tasks && tasks.technicianName}</Badge>
        <Badge variant="default" className="text-sm text-white ">{tasks && formatDate(tasks.inspectionDate.toString() ?? "")}</Badge>
      </header>
      <main>
        <ul className="space-y-6">
          {tasks && tasks.cars?.map((car) => (
            <li key={car.inspectionScheduleId} className="border border-gray-300 p-4 rounded-lg hover:cursor-pointer">
              <div className="flex items-start justify-between mb-2" onClick={() => setIsCarDetailsOpen(true)}>
                <div>
                  <h2 className="font-semibold">{car.modelName}-{car.licensePlate}</h2>
                  <p className="text-sm text-gray-600">{car.inspectionAddress}</p>
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => {
                    event!.stopPropagation();
                    rejectTechnicianTask.mutate({
                      id: car.inspectionScheduleId,
                      note: Note[car.inspectionScheduleId] ?? "",
                    });
                  }
                  } className=" 
                                        w-6 h-6 flex items-center justify-center p-0 border-none cursor-pointer text-xs "
                    aria-label="Reject"
                  >
                    <X />
                  </Button>
                  <Button onClick={() => {
                    event!.stopPropagation();
                    inProgressTechnicianTask.mutate({
                      id: car.inspectionScheduleId
                    });
                  }
                  } className=" 
                                        w-6 h-6 flex items-center justify-center p-0 border-none cursor-pointer text-xs "
                    aria-label="Reject"
                  >
                    <Check />
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
