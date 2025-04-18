"use client";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InspectionScheduleDetail } from "@/constants/models/inspection-schedule.model";
import { formatDate, formatDateToHour } from "@/lib/utils";
import { useEffect, useState } from "react";
import { EventDetailDialog } from "./event-detail-dialog";
import TimeBadgeComponent from "./time-badge";

interface MonthCalendarProps {
  statusClasses: Record<string, string>;
  selectedEvent: InspectionScheduleDetail | null;
  handleEventClick: (schedule: InspectionScheduleDetail | null) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  schedules: InspectionScheduleDetail[];
}

export function MonthCalendar({
  currentDate,
  onDateChange,
  selectedEvent,
  handleEventClick,
  statusClasses,
  schedules,
}: MonthCalendarProps) {
  const [calendarDays, setCalendarDays] = useState<
    Array<{ date: Date | null; isCurrentMonth: boolean }>
  >([]);


  // Get days for the calendar grid
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    const days: Array<{ date: Date | null; isCurrentMonth: boolean }> = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDate = new Date(year, month, -firstDayOfWeek + i + 1);
      days.push({ date: prevMonthDate, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      days.push({ date: nextMonthDate, isCurrentMonth: false });
    }

    setCalendarDays(days);
  }, [currentDate]);


  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>

        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center font-medium py-2 border-b border-gray-200"
            >
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => {
            if (!day.date) {
              return (
                <div key={index} className="h-24 border border-gray-100"></div>
              );
            }
            const daySchedules = schedules.filter((schedule) => {
              return (
                formatDate(schedule.inspectionDate.toString()) ===
                formatDate(day.date?.toString() ?? "")
              );
            });
            const today = new Date();
            const isToday =
              day.date.getDate() === today.getDate() &&
              day.date.getMonth() === today.getMonth() &&
              day.date.getFullYear() === today.getFullYear();

            return (
              <div
                key={index}
                className={`min-h-24 h-auto p-1 border ${day.isCurrentMonth ? "bg-white" : "bg-gray-50"
                  }
                                    ${isToday ? "ring-2 ring-black" : ""}
                                    ${!day.isCurrentMonth ? "text-gray-400" : ""
                  }`}
              >
                <div className="text-right mb-1">{day.date.getDate()}</div>
                <div className="overflow-y-hidden space-y-1">
                  {daySchedules.length > 0 ? (
                    daySchedules.length <= 3 ? (
                      daySchedules.map((schedule) => (
                        <TimeBadgeComponent
                          key={schedule.id}
                          statusClasses={statusClasses}
                          schedule={schedule}
                          onEventClick={handleEventClick}
                        />
                      ))
                    ) : (
                      <div key={index}>
                        {daySchedules
                          .slice(0, 2)
                          ?.map((schedule) => (
                            <TimeBadgeComponent
                              key={schedule.id}
                              statusClasses={statusClasses}
                              schedule={schedule}
                              onEventClick={handleEventClick}
                            />
                          )) ?? []}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              className="w-full justify-center bg-gray-800 hover:bg-black cursor-pointer text-xs"
                              onClick={() => handleEventClick(daySchedules[2])}
                            >
                              +{daySchedules.length - 2} more
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm space-y-2">
                              {daySchedules.slice(2).map((schedule) => (
                                <div
                                  key={schedule.id}
                                  className="border-b pb-1 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleEventClick(schedule)}
                                >
                                  <p>
                                    <strong>
                                      {formatDateToHour(
                                        schedule.inspectionDate.toString()
                                      )}{" "}
                                      - {schedule.carOwnerName}
                                    </strong>
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {schedule.inspectionAddress}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedEvent && (
        <EventDetailDialog
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => handleEventClick(null)}
        />
      )}
    </>
  );
}
