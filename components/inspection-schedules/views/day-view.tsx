"use client";

import { InspectionScheduleDetail } from "@/constants/models/inspection-schedule.model";
import { format } from "date-fns";
import { EventDetailDialog } from "../event-detail-dialog";
import TimeBadgeComponent from "../time-badge";

interface DayViewProps {
  schedules: InspectionScheduleDetail[];
  selectedEvent: InspectionScheduleDetail | null;
  handleEventClick: (schedule: InspectionScheduleDetail | null) => void;
  currentDate: Date;
  statusClasses: Record<string, string>;
  onDateChange: (date: Date) => void;
}

export function DayView({ schedules, selectedEvent, handleEventClick, currentDate, statusClasses }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div>
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
                    <TimeBadgeComponent key={schedule.id} statusClasses={statusClasses} schedule={schedule} onEventClick={handleEventClick} />
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
          onClose={() => handleEventClick(null)}
        />
      )}
    </div>
  );
}
