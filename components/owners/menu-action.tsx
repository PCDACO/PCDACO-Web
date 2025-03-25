import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { OwnerPayLoad } from "@/constants/models/owner.model";

interface MenuActionProps {
  id: string;
}

export const useOwnerStore = createGenericStore<OwnerPayLoad>();

const MenuAction: React.FC<MenuActionProps> = ({ id }) => {
  const { setKeyword } = useKeywordStore();
  const { setOpen } = useDialogStore();
  const { setId } = useIdStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" >
        <DropdownMenuItem
          className="bg-red-200"
          onClick={() => {
            setKeyword("delete");
            setOpen(true);
            setId(id);
          }}
        >
          Chặn người dùng
        </DropdownMenuItem>
      </DropdownMenuContent >
    </DropdownMenu>
  );
};

export default MenuAction;
