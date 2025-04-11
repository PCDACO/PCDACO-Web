import { formatDateToHour } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../ui/context-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const TimeBadgeComponent = ({
  statusClasses: Record<string, string>,
  schedule:

}) => {
  return <ContextMenu>
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
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent className="w-64">
      <ContextMenuItem inset>
        Back
      </ContextMenuItem>
      <ContextMenuItem inset disabled>
        Forward
      </ContextMenuItem>
      <ContextMenuItem inset>
        Reload
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48">
          <ContextMenuItem>
            Save Page As...
          </ContextMenuItem>
          <ContextMenuItem>Create Shortcut...</ContextMenuItem>
          <ContextMenuItem>Name Window...</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Developer Tools</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem checked>
        Show Bookmarks Bar
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
      <ContextMenuSeparator />
      <ContextMenuRadioGroup value="pedro">
        <ContextMenuLabel inset>People</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioItem value="pedro">
          Pedro Duarte
        </ContextMenuRadioItem>
        <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
      </ContextMenuRadioGroup>
    </ContextMenuContent>
  </ContextMenu>
}

export default TimeBadgeComponent;
