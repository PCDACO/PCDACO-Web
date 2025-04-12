"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MonthCalendar } from "./month-calendar"
import { useInspectionScheduleQuery } from "@/hooks/inspection-schedules/use-inspection-schedules"
import { useInspectionScheduleParamStore } from "@/stores/store"

export default function PersonalCalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { value, setValue } = useInspectionScheduleParamStore();
  const { listCurrentInspectionSchedules } = useInspectionScheduleQuery({
    params: value
  });
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
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
          </div>
        </div>
        <Card className="border-black">
          <CardContent className="p-0">
            <MonthCalendar currentDate={currentDate} onDateChange={setCurrentDate} schedules={listCurrentInspectionSchedules.data?.value ?? []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
