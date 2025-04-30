import { InspectionScheduleDetail, InspectionSchedulePayload } from "@/constants/models/inspection-schedule.model";
import { formatDateToHour } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { createGenericStore } from "@/stores/store";

interface Props {
  statusClasses: Record<string, string>,
  schedule: InspectionScheduleDetail,
  onEventClick: (schedule: InspectionScheduleDetail) => void;
}

export const useInspectionStore = createGenericStore<InspectionSchedulePayload>();

const TimeBadgeComponent = ({
  statusClasses, schedule, onEventClick
}: Props) => {
  // Component
  return <>
    <Badge
      onClick={() => onEventClick(schedule)}
      className={`w-full justify-start truncate bg-black ${statusClasses[schedule.statusName] || "bg-slate-300"}  cursor-pointer text-xs hover:${statusClasses}`}>
      {formatDateToHour(schedule.inspectionDate.toString())} - {schedule.carOwnerName}
    </Badge>
  </>
}

export default TimeBadgeComponent;
