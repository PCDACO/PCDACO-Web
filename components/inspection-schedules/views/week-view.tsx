"use client";

import { InspectionScheduleDetail } from "@/constants/models/inspection-schedule.model";
import { addDays, format, startOfWeek } from "date-fns";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { EventDetailDialog } from "../event-detail-dialog";

interface WeekViewProps {
  schedules: InspectionScheduleDetail[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export function WeekView({ schedules, currentDate }: WeekViewProps) {
  const [selectedEvent, setSelectedEvent] =
    useState<InspectionScheduleDetail | null>(null);
  const weekStart = startOfWeek(currentDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  // Only show hours from 7AM to 10PM
  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7AM to 10PM

  const getScheduleStyle = (schedule: InspectionScheduleDetail) => {
    const baseStyle =
      "absolute inset-0 m-0.5 rounded-md px-2 flex items-center text-xs text-white cursor-pointer truncate hover:opacity-90 transition-opacity";
    switch (schedule.statusName) {
      case "Pending":
        return `${baseStyle} bg-yellow-500`;
      case "InProgress":
        return `${baseStyle} bg-blue-500`;
      case "Approved":
        return `${baseStyle} bg-green-500`;
      default:
        return `${baseStyle} bg-red-500`;
    }
  };

  const handleEventClick = (event: InspectionScheduleDetail) => {
    setSelectedEvent(event);
  };

  return (
    <TooltipProvider>
      <div className="p-4">
        <div className="grid grid-cols-8 border-b">
          <div className="p-2 border-r"></div>
          {days.map((day) => (
            <div key={day.toString()} className="p-2 text-center border-r">
              <div className="font-medium">{format(day, "EEE")}</div>
              <div className="text-sm text-muted-foreground">
                {format(day, "MMM d")}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-8">
          <div className="border-r">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-16 border-b p-1 text-sm flex items-center"
              >
                {format(new Date().setHours(hour), "ha")}
              </div>
            ))}
          </div>
          {days.map((day) => (
            <div key={day.toString()} className="relative border-r">
              {hours.map((hour) => (
                <div key={hour} className="h-16 border-b p-1 relative">
                  {schedules
                    .filter((schedule) => {
                      const scheduleDate = new Date(schedule.inspectionDate);
                      return (
                        scheduleDate.getDate() === day.getDate() &&
                        scheduleDate.getMonth() === day.getMonth() &&
                        scheduleDate.getHours() === hour
                      );
                    })
                    .map((schedule) => (
                      <Tooltip key={schedule.id}>
                        <TooltipTrigger className="h-full w-full">
                          <div
                            className={getScheduleStyle(schedule)}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleEventClick(schedule);
                            }}
                          >
                            {format(new Date(schedule.inspectionDate), "HH:mm")}{" "}
                            - {schedule.carOwnerName}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm space-y-1">
                            <p>
                              <strong>Time:</strong>{" "}
                              {format(
                                new Date(schedule.inspectionDate),
                                "HH:mm"
                              )}
                            </p>
                            <p>
                              <strong>Owner:</strong> {schedule.carOwnerName}
                            </p>
                            <p>
                              <strong>Address:</strong>{" "}
                              {schedule.inspectionAddress}
                            </p>
                            <p>
                              <strong>Status:</strong> {schedule.statusName}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {selectedEvent && (
        <EventDetailDialog
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </TooltipProvider>
  );
}
