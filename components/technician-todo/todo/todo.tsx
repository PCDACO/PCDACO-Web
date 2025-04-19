"use client";
import { useState } from "react";
import CarDetailsDialog from "@/components/cars/detail-dialog";
import { useTechnicianTaskMutation, useTechnicianTaskQuery } from "@/hooks/technician-tasks/use-technician-tasks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarDays, Check, Clock, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useDialogStore } from "@/stores/store";
import { CarDetail } from "@/constants/models/technician-task.model";
import { Card, CardContent } from "@/components/ui/card";
import { CustomCalendar } from "@/components/ui/custom-calendar";

export default function TechnicianTodo() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const { open, setOpen } = useDialogStore();
  const { listTechnicianTasks } = useTechnicianTaskQuery({
    inspectionDate: selectedDate === undefined ? undefined : new Date(new Date(selectedDate!).getTime() + (24 * 60 * 60 * 1000))
  });
  const { rejectTechnicianTask, inProgressTechnicianTask } = useTechnicianTaskMutation();
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
              <CustomCalendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Card className="min-h-[500px]">
          {
            //eslint-disable-next-line
            (listTechnicianTasks && (listTechnicianTasks?.data?.value?.cars?.length > 0)) &&
            (
              <CardContent>
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
                            <Button onClick={() => {
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
                              inProgressTechnicianTask.mutate({
                                id: car.inspectionScheduleId
                              });
                            }
                            } className=" w-8 h-8 flex items-center justify-center p-0 border-none cursor-pointer text-xs " aria-label="Approve"
                            >
                              <Check />
                            </Button>
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
              </CardContent>
            )
          }{
            (!listTechnicianTasks || (listTechnicianTasks?.data?.value?.cars?.length === 0)) && (
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                  <div className="relative">
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-amber-100 text-amber-700 rounded-full p-1.5">
                        <Clock className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">Không tìm thấy ngày</h3>
                    <p className="text-gray-500 max-w-md">
                      Bạn chưa chọn ngày nào. Vui lòng chọn một ngày để xem lịch làm việc của bạn.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-dashed border-purple-200">
                    <div className="flex items-center gap-2 text-purple-600">
                      <CalendarDays className="h-5 w-5" />
                      <span className="font-medium">Ngày sáng tạo:</span>
                    </div>
                    {/* <p className="mt-2 text-lg font-semibold text-purple-700">{}</p> */}
                    <p className="text-xs text-purple-500 mt-1 italic">*Đây là ngày tưởng tượng từ vũ trụ song song</p>
                  </div>
                </div>
              </CardContent>
            )
          }
        </Card >
      </div >
      <CarDetailsDialog car={selectedCar} isOpen={open} onOpenChange={() => setOpen(!open)} />
    </>
  );
}
