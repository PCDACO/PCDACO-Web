"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInspectionScheduleQuery } from "@/hooks/inspection-schedules/use-inspection-schedules";
import {
  useDialogStore,
  useIdStore,
  useInspectionScheduleParamStore,
} from "@/stores/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useInspectionStore } from "./time-badge";
import { InspectionScheduleDetail } from "@/constants/models/inspection-schedule.model";
import { WeekView } from "../inspection-schedules/views/week-view";
import { DayView } from "../inspection-schedules/views/day-view";
import { MonthCalendar } from "../inspection-schedules/month-calendar";
import UpdateInspectionForm from "../inspection-schedules/update-inspection-form";

type ViewType = "month" | "week" | "day";

export default function TechnicianCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>("month");
  const { value, setValue } = useInspectionScheduleParamStore();
  const { listCurrentInspectionSchedules } = useInspectionScheduleQuery({
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
      schedules: listCurrentInspectionSchedules.data?.value ?? [],
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

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex sm:flex-row justify-end items-center gap-4">
            <div className="flex justify-end items-center gap-4">
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
