"use client";

import { InspectionScheduleDetail } from "@/constants/models/inspection-schedule.model";
import { Car, MapPin, Tag, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";

interface EventDetailDialogProps {
  event: InspectionScheduleDetail;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailDialog({
  event,
  isOpen,
  onClose,
}: EventDetailDialogProps) {
  const { push } = useRouter();
  const handleNavigateDetailClick = () => {
    push(`/inspection-schedules/${event.id}/details`);
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Thông tin kiểm tra</DialogTitle>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
              {event.statusName}
            </Badge>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Kiểm định viên</p>
                <p className="text-sm text-muted-foreground">
                  {event.technicianName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Chủ xe</p>
                <p className="text-sm text-muted-foreground">
                  {event.carOwnerName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Mã xe</p>
                <p className="text-sm text-muted-foreground">{event.carId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Địa chỉ</p>
                <p className="text-sm text-muted-foreground">
                  {event.inspectionAddress}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={handleNavigateDetailClick} >
              Chi tiết
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
