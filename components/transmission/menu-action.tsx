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
import { TransmissionPayload } from "@/constants/models/transmission.model";

interface MenuActionProps {
  id: string;
  payload: TransmissionPayload;
}

export const useTransmissionStore = createGenericStore<TransmissionPayload>();

const MenuAction: React.FC<MenuActionProps> = ({ id, payload }) => {
  const { setKeyword } = useKeywordStore();
  const { setOpen } = useDialogStore();
  const { setId } = useIdStore();
  const { setData } = useTransmissionStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => {
            setKeyword("update");
            setOpen(true);
            setId(id);
            setData(payload);
          }}
        >
          Cập nhật
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-red-200 hover:cursor-pointer"
          onClick={() => {
            setKeyword("delete");
            setOpen(true);
            setId(id);
            setData(payload);
          }}
        >
          Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuAction;
