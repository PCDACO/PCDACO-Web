import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            setKeyword("update");
            setOpen(true);
            setId(id);
            setData(payload);
          }}
        >
          Update
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setKeyword("delete");
            setOpen(true);
            setId(id);
            setData(payload);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuAction;
