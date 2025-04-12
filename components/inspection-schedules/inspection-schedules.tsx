"use client"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MonthCalendar } from "@/components/inspection-schedules/month-calendar"
import { useInspectionScheduleQuery } from "@/hooks/inspection-schedules/use-inspection-schedules"
import { useDialogStore, useIdStore, useInspectionScheduleParamStore } from "@/stores/store"
import { useRouter } from "next/navigation"
import UpdateInspectionForm from "./update-inspection-form"
import { useInspectionStore } from "./time-badge"

export default function TechnicianCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { value, setValue } = useInspectionScheduleParamStore();
  const { listInspectionSchedules } = useInspectionScheduleQuery({
    params: value
  });
  const { open, setOpen } = useDialogStore();
  const { id } = useIdStore();
  const { data } = useInspectionStore();
  const { replace } = useRouter();
  // Filter schedules when technician selection changes
  useEffect(() => {
    const date = new Date(currentDate.toString());
    setValue({
      ...value,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Select onValueChange={(e) => setValue({
                  ...value,
                  technicianId: e
                })
                }>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all"></SelectItem>
                    {listInspectionSchedules.data?.value?.filter((item, index, arr) => {
                      return arr.findIndex(t => t.technicianId === item.technicianId) === index
                    }).map((tech) => (
                      <SelectItem key={tech.id} value={tech.technicianId}>
                        {tech.technicianName}
                      </SelectItem>
                    )) ?? []}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => replace("/inspection-schedules/create")} className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />Tạo
              </Button>
            </div>
          </div>
          <Card className="border-black">
            <CardContent className="p-0">
              <MonthCalendar currentDate={currentDate} onDateChange={setCurrentDate} schedules={listInspectionSchedules.data?.value ?? []} />
            </CardContent>
          </Card>
        </div>
      </div>
      <UpdateInspectionForm id={id} value={data ?? {
        carId: "",
        inspectionAddress: "",
        inspectionDate: new Date(),
        technicianId: "",
        isIncident: false,
      }} isOpen={open} onOpenChange={() => setOpen(!open)} />
    </>
  )
}
