"use client";

import { InspectionScheduleDetail } from "@/constants/models/inspection-schedule.model";
import { addDays, format, startOfWeek } from "date-fns";
import { EventDetailDialog } from "../event-detail-dialog";
import TimeBadgeComponent from "../time-badge";

interface WeekViewProps {
  statusClasses: Record<string, string>;
  selectedEvent: InspectionScheduleDetail | null;
  handleEventClick: (schedule: InspectionScheduleDetail | null) => void;
  schedules: InspectionScheduleDetail[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export function WeekView({ schedules, selectedEvent, handleEventClick, currentDate, statusClasses: statusClass }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  // Only show hours from 7AM to 10PM
  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7AM to 10PM

  return (
    <>
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
                      <TimeBadgeComponent statusClasses={statusClass} schedule={schedule} onEventClick={handleEventClick} />
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
          onClose={() => handleEventClick(null)}
        />
      )}
    </>
  );
}
