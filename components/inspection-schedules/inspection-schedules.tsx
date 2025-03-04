"use client"
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MonthCalendar } from "@/components/inspection-schedules/month-calendar"
import { useInspectionScheduleQuery } from "@/hooks/inspection-schedules/use-inspection-schedules"
import { useInspectionScheduleParamStore } from "@/stores/store"
import CreateInspectionForm from "./create-inspection-form"

export default function TechnicianCalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const { value, setValue } = useInspectionScheduleParamStore();
    const { listInspectionSchedules } = useInspectionScheduleQuery({
        params: value
    });
    // Filter schedules when technician selection changes

    return (
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
                                    <SelectItem value="all">All Technicians</SelectItem>
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-black text-white hover:bg-gray-800">
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Inspection
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Schedule New Inspection</DialogTitle>
                                </DialogHeader>
                                <CreateInspectionForm
                                    id={""}
                                    value={{
                                        carId: "",
                                        technicianId: "",
                                        inspectionAddress: "",
                                        inspectionDate: new Date()
                                    }} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <Card className="border-black">
                    <CardContent className="p-0">
                        <MonthCalendar currentDate={currentDate} onDateChange={setCurrentDate} schedules={listInspectionSchedules.data?.value ?? []} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}