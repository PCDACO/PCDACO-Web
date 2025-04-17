import { InspectionScheduleDetail, InspectionSchedulePayload } from "@/constants/models/inspection-schedule.model";
import { formatDateToHour } from "@/lib/utils";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { createGenericStore, useDialogStore, useIdStore, useKeywordStore } from "@/stores/store";
import { useRouter } from "next/navigation";

interface Props {
  statusClasses: Record<string, string>,
  schedule: InspectionScheduleDetail,
}

export const useInspectionStore = createGenericStore<InspectionSchedulePayload>();

const TimeBadgeComponent = ({
  statusClasses, schedule
}: Props) => {
  // Init States
  const { setData } = useInspectionStore();
  const { setId } = useIdStore();
  const { setOpen } = useDialogStore();
  const { setKeyword } = useKeywordStore();
  const { push } = useRouter();
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

  const handleDetailClick = () => {
    push(`/inspection-schedules/${schedule.id}/details`);
  }
  // Component
  return <>
    <ContextMenu >
      <ContextMenuTrigger >
        <Tooltip key={schedule.id}>
          <TooltipTrigger asChild>
            <Badge
              className={`w-full justify-start truncate bg-black ${statusClasses[schedule.statusName] || "bg-slate-300"}  cursor-pointer text-xs hover:${statusClasses}`}>
              {formatDateToHour(schedule.inspectionDate.toString())} - {schedule.carOwnerName}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className={`text-sm`}>
              <p>
                <strong>Owner:</strong> {schedule.carOwnerName}
              </p>
              <p>
                <strong>Time:</strong> {formatDateToHour(schedule.inspectionDate.toString())}
              </p>
              <p>
                <strong>Address:</strong> {schedule.inspectionAddress}
              </p>
              <p>
                <strong>Status:</strong> {schedule.statusName}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={handleDetailClick} className="hover:cursor-pointer">
          Chi tiết
        </ContextMenuItem>
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
