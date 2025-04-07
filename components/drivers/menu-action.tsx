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
  useBanStore,
  useDialogStore,
  useIdStore,
} from "@/stores/store";
import { DriverPayLoad } from "@/constants/models/driver.model";
import { useRouter } from "next/navigation";

interface MenuActionProps {
  id: string;
  isBanned: boolean;
}

export const useDriverStore = createGenericStore<DriverPayLoad>();

const MenuAction: React.FC<MenuActionProps> = ({ id, isBanned }) => {
  const { setOpen } = useDialogStore();
  const { setId } = useIdStore();
  const { setIsBanned } = useBanStore();
  const { push } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" >
        <DropdownMenuLabel>Tùy Chọn</DropdownMenuLabel>
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => { push(`/users/${id}`) }}
        >
          Chi tiết
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="bg-red-200 hover:cursor-pointer"
          onClick={() => {
            setOpen(true);
            setId(id);
            setIsBanned(isBanned);
          }}
        >
          {isBanned ? "Gỡ chặn người dùng" : "Chặn người dùng"}
        </DropdownMenuItem>
      </DropdownMenuContent >
    </DropdownMenu>
  );
};

export default MenuAction;
