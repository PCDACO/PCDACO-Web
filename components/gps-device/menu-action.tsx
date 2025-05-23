import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createGenericStore,
  useDialogStore,
  useIdStore,
  useKeywordStore,
} from "@/stores/store";
import { GPSDevicePayload } from "@/constants/models/gps-device.model";
import { useRouter } from "next/navigation";

interface MenuActionProps {
  id: string;
  payload: GPSDevicePayload;
}

export const useGPSDeviceStore = createGenericStore<GPSDevicePayload>();

const MenuAction: React.FC<MenuActionProps> = ({ id, payload }) => {
  const { setKeyword } = useKeywordStore();
  const { setOpen } = useDialogStore();
  const { setId } = useIdStore();
  const { setData } = useGPSDeviceStore();
  const { push } = useRouter();

  const handleDetailClick = () => push(`/cars/${payload.carId}`);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
        {
          payload.carId && (
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={handleDetailClick}
            >
              Chi tiết xe
            </DropdownMenuItem>
          )
        }
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => {
            setKeyword("update");
            setId(id);
            setData(payload);
            setOpen(true);
          }}
        >
          Cập nhật
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:cursor-pointer bg-orange-300"
          onClick={() => {
            setKeyword("delete");
            setOpen(true);
            setId(id);
            setData(payload);
          }}
        >
          Gỡ thiết bị
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:cursor-pointer bg-red-200"
          onClick={() => {
            setKeyword("create");
            setOpen(true);
            setId(id);
            setData(payload);
          }}
        >
          Xóa thiết bị
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  );
};

export default MenuAction;
