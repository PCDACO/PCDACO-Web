"use client";

import { InspectionScheduleDetail } from "@/constants/models/inspection-schedule.model";
import { format } from "date-fns";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { EventDetailDialog } from "../event-detail-dialog";

interface DayViewProps {
  schedules: InspectionScheduleDetail[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export function DayView({ schedules, currentDate }: DayViewProps) {
  const [selectedEvent, setSelectedEvent] =
    useState<InspectionScheduleDetail | null>(null);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <TooltipProvider>
      <div className="flex flex-col p-4">
        <div className="text-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {format(currentDate, "EEEE, MMMM d, yyyy")}
          </h2>
        </div>
        <div className="flex-1">
          {hours.map((hour) => (
            <div key={hour} className="flex border-b h-16">
              <div className="w-20 p-2 border-r text-sm text-muted-foreground flex items-center">
                {format(new Date().setHours(hour), "ha")}
              </div>
              <div className="flex-1 p-2 relative">
                {schedules
                  .filter((schedule) => {
                    const scheduleDate = new Date(schedule.inspectionDate);
                    return (
                      scheduleDate.getDate() === currentDate.getDate() &&
                      scheduleDate.getHours() === hour
                    );
                  })
                  .map((schedule) => (
                    <Tooltip key={schedule.id}>
                      <TooltipTrigger className="h-full w-full">
                        <div
                          className={`absolute inset-0 m-0.5 rounded-md px-2 flex items-center text-xs text-white cursor-pointer truncate ${
                            schedule.statusName === "Pending"
                              ? "bg-yellow-500"
                              : schedule.statusName === "InProgress"
                              ? "bg-blue-500"
                              : schedule.statusName === "Approved"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                          onClick={() => setSelectedEvent(schedule)}
                        >
                          {format(new Date(schedule.inspectionDate), "HH:mm")} -{" "}
                          {schedule.carOwnerName}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm">
                          <p>
                            <strong>Time:</strong>{" "}
                            {format(new Date(schedule.inspectionDate), "HH:mm")}
                          </p>
                          <p>
                            <strong>Owner:</strong> {schedule.carOwnerName}
                          </p>
                          <p>
                            <strong>Address:</strong>{" "}
                            {schedule.inspectionAddress}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
              </div>
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
