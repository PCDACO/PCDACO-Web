"use client";
import { useState } from "react";
import CarDetailsDialog from "@/components/cars/detail-dialog";
import { useTechnicianTaskMutation, useTechnicianTaskQuery } from "@/hooks/technician-tasks/use-technician-tasks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useDialogStore } from "@/stores/store";
import { CarDetail } from "@/constants/models/technician-task.model";

export default function TechnicianTodo() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const { open, setOpen } = useDialogStore();
  const { listTechnicianTasks } = useTechnicianTaskQuery({
    inspectionDate: new Date(new Date(selectedDate!).getTime() + (24 * 60 * 60 * 1000))
  });
  const { rejectTechnicianTask, inProgressTechnicianTask } = useTechnicianTaskMutation();
  const todayDate = new Date();
  const [Note, SetNote] = useState<Record<string, string>>({
    dummy: "dummy",
  });
  const [selectedCar, setSelectedCar] = useState<CarDetail | undefined>(undefined);
  const handleNoteChange = (taskId: string, note: string) => {
    SetNote({
      ...Note,
      [taskId]: note,
    });
  };
  const handleTodoClick = (car: CarDetail) => {
    setOpen(true);
    setSelectedCar(car);
  }
  return (
    <>
      <div className="min-h-screen bg-white text-black p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">Lịch Làm Việc</h1>
        {/* Picker chọn ngày */}
        <div className="mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <main>
          <ul className="space-y-6">
            {listTechnicianTasks.data.value && listTechnicianTasks.data.value.cars?.map((car) => (
              <li key={car.inspectionScheduleId} className="border border-gray-300 p-4 rounded-lg ">
                <div className="flex flex-col items-start justify-between mb-2" >
                  <div className="flex flex-row w-full justify-between">
                    <div className="hover:cursor-pointer" onClick={() => handleTodoClick(car)}>
                      <h2 className="font-semibold">{car.modelName}-{car.licensePlate}</h2>
                      <p className="text-sm text-gray-600">{car.inspectionAddress}</p>
                    </div>
                    <div className="flex gap-4">
                      {(
                        todayDate.getDate() === new Date((new Date(listTechnicianTasks?.data?.value?.inspectionDate).getTime() - (24 * 60 * 60 * 1000))).getDate() &&
                        todayDate.getMonth() === new Date((new Date(listTechnicianTasks?.data?.value?.inspectionDate).getTime() - (24 * 60 * 60 * 1000))).getMonth() &&
                        todayDate.getFullYear() === new Date((new Date(listTechnicianTasks?.data?.value?.inspectionDate).getTime() - (24 * 60 * 60 * 1000))).getFullYear()
                      ) && (
                          <>
                            <Button onClick={() => {
                              event!.stopPropagation();
                              rejectTechnicianTask.mutate({
                                id: car.inspectionScheduleId,
                                note: Note[car.inspectionScheduleId] ?? "",
                              });
                            }
                            } className=" w-8 h-8 flex items-center justify-center p-0 border-none cursor-pointer text-xs bg-red-500" aria-label="Reject"
                            >
                              <X />
                            </Button>
                            <Button onClick={() => {
                              event!.stopPropagation();
                              inProgressTechnicianTask.mutate({
                                id: car.inspectionScheduleId
                              });
                            }
                            } className=" w-8 h-8 flex items-center justify-center p-0 border-none cursor-pointer text-xs " aria-label="Approve"
                            >
                              <Check />
                            </Button>
                          </>
                        )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label
                      htmlFor={`notes-${car.inspectionScheduleId}`}
                      className="text-sm font-medium"
                    >
                      Notes:
                    </Label>
                    <Input
                      id={`notes-${car.id}`}
                      placeholder="Nhập note"
                      className="mt-1"
                      onChange={(e) =>
                        handleNoteChange(
                          car.inspectionScheduleId,
                          e.currentTarget.value ?? ""
                        )
                      }
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main >
      </div >
      <CarDetailsDialog car={selectedCar} isOpen={open} onOpenChange={() => setOpen(!open)} />
    </>
  );
}
