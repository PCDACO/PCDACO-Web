import { InspectionScheduleDetail, InspectionSchedulePayload } from "@/constants/models/inspection-schedule.model";
import { formatDateToHour } from "@/lib/utils";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { Badge } from "../ui/badge";
import { createGenericStore, useDialogStore, useIdStore, useKeywordStore } from "@/stores/store";

interface Props {
  statusClasses: Record<string, string>,
  schedule: InspectionScheduleDetail,
  onEventClick: (schedule: InspectionScheduleDetail) => void;
}

export const useInspectionStore = createGenericStore<InspectionSchedulePayload>();

const TimeBadgeComponent = ({
  statusClasses, schedule, onEventClick
}: Props) => {
  // Init States
  const { setData } = useInspectionStore();
  const { setId } = useIdStore();
  const { setOpen } = useDialogStore();
  const { setKeyword } = useKeywordStore();
  // Handle
  const handleEditClick = () => {
    setId(schedule.id);
    setKeyword("update")
    setData({
      inspectionAddress: schedule.inspectionAddress,
      technicianId: schedule.technicianId,
      carId: schedule.carId,
      inspectionDate: schedule.inspectionDate,
      type: schedule.type ?? 0,
      reportId: schedule.reportId ?? "",
    });
    setOpen(true);
  }

  const handleDeleteClick = () => {
    setId(schedule.id);
    setKeyword("delete");
    setOpen(true);
  }
  // Component
  return <>
    <ContextMenu >
      <ContextMenuTrigger >
        <Badge
          onClick={() => onEventClick(schedule)}
          className={`w-full justify-start truncate bg-black ${statusClasses[schedule.statusName] || "bg-slate-300"}  cursor-pointer text-xs hover:${statusClasses}`}>
          {formatDateToHour(schedule.inspectionDate.toString())} - {schedule.carOwnerName}
        </Badge>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={handleEditClick} className="hover:cursor-pointer">
          Cập nhật
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDeleteClick} className="hover:cursor-pointer">
          Hủy
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </>
}

export default TimeBadgeComponent;
