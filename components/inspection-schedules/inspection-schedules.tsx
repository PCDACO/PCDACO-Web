"use client";
import { MonthCalendar } from "@/components/inspection-schedules/month-calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInspectionScheduleQuery } from "@/hooks/inspection-schedules/use-inspection-schedules";
import {
  useDialogStore,
  useIdStore,
  useInspectionScheduleParamStore,
} from "@/stores/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useInspectionStore } from "./time-badge";
import UpdateInspectionForm from "./update-inspection-form";
import { DayView } from "./views/day-view";
import { WeekView } from "./views/week-view";
import { InspectionScheduleDetail } from "@/constants/models/inspection-schedule.model";

type ViewType = "month" | "week" | "day";

export default function TechnicianCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>("month");
  const { value, setValue } = useInspectionScheduleParamStore();
  const { listInspectionSchedules } = useInspectionScheduleQuery({
    params: value,
  });
  const { open, setOpen } = useDialogStore();
  const { id } = useIdStore();
  const { data } = useInspectionStore();
  const [selectedEvent, setSelectedEvent] =
    useState<InspectionScheduleDetail | null>(null);

  const handleEventClick = (schedule: InspectionScheduleDetail | null) => {
    setSelectedEvent(schedule);
  }

  const statusClasses: Record<string, string> = {
    Pending: "bg-yellow-500",
    InProgress: "bg-blue-500",
    Expired: "bg-red-500",
    Rejected: "bg-red-500",
    Approved: "bg-green-500",
  };

  // Get unique technicians
  const uniqueTechnicians = React.useMemo(() => {
    const technicians =
      listInspectionSchedules.data?.value?.filter((item, index, arr) => {
        return (
          arr.findIndex((t) => t.technicianId === item.technicianId) === index
        );
      }) ?? [];
    return technicians;
  }, [listInspectionSchedules.data?.value]);

  useEffect(() => {
    const date = new Date(currentDate.toString());
    setValue({
      ...value,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
    //eslint-disable-next-line
  }, [currentDate]);

  const handlePrevious = () => {
    const date = new Date(currentDate);
    switch (view) {
      case "month":
        date.setMonth(date.getMonth() - 1);
        break;
      case "week":
        date.setDate(date.getDate() - 7);
        break;
      case "day":
        date.setDate(date.getDate() - 1);
        break;
    }
    setCurrentDate(date);
  };

  const handleNext = () => {
    const date = new Date(currentDate);
    switch (view) {
      case "month":
        date.setMonth(date.getMonth() + 1);
        break;
      case "week":
        date.setDate(date.getDate() + 7);
        break;
      case "day":
        date.setDate(date.getDate() + 1);
        break;
    }
    setCurrentDate(date);
  };

  const renderView = () => {
    const viewProps = {
      currentDate,
      onDateChange: setCurrentDate,
      schedules: listInspectionSchedules.data?.value ?? [],
    };

    switch (view) {
      case "month":
        return <MonthCalendar selectedEvent={selectedEvent} handleEventClick={handleEventClick} statusClasses={statusClasses} {...viewProps} />;
      case "week":
        return <WeekView selectedEvent={selectedEvent} handleEventClick={handleEventClick} statusClasses={statusClasses} {...viewProps} />;
      case "day":
        return <DayView selectedEvent={selectedEvent} handleEventClick={handleEventClick} statusClasses={statusClasses} {...viewProps} />;
    }
  };

  const handleTechnicianChange = (techId: string) => {
    setValue({
      ...value,
      technicianId: techId === "all" ? undefined : techId,
    });
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Select
                  defaultValue="all"
                  onValueChange={handleTechnicianChange}
                  value={value.technicianId || "all"}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="hover:cursor-pointer" value="all">Tất cả</SelectItem>
                    {uniqueTechnicians.map((tech) => (
                      <SelectItem
                        className="hover:cursor-pointer"
                        key={tech.technicianId}
                        value={tech.technicianId}
                      >
                        {tech.technicianName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-x-1">
                <Button
                  variant={view === "month" ? "default" : "outline"}
                  onClick={() => setView("month")}
                >
                  Tháng
                </Button>
                <Button
                  variant={view === "week" ? "default" : "outline"}
                  onClick={() => setView("week")}
                >
                  Tuần
                </Button>
                <Button
                  variant={view === "day" ? "default" : "outline"}
                  onClick={() => setView("day")}
                >
                  Ngày
                </Button>
              </div>
            </div>
          </div>
          <Card className="border-black">
            <CardContent className="p-0">{renderView()}</CardContent>
          </Card>
        </div>
      </div>
      <UpdateInspectionForm
        id={id}
        value={
          data ?? {
            carId: "",
            inspectionAddress: "",
            inspectionDate: new Date(),
            technicianId: "",
            type: 0,
            reportId: "",
          }
        }
        isOpen={open}
        onOpenChange={() => setOpen(!open)}
      />
    </>
  );
}
