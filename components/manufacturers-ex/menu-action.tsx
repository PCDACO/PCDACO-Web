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
import { ManufacturePayload } from "@/constants/models/manufacture.model";

interface MenuActionProps {
  id: string;
  payload: ManufacturePayload;
}

export const useManuFactureStore = createGenericStore<ManufacturePayload>();

const MenuAction: React.FC<MenuActionProps> = ({ id, payload }) => {
  const { setKeyword } = useKeywordStore();
  const { setOpen } = useDialogStore();
  const { setId } = useIdStore();
  const { setData } = useManuFactureStore();

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
            setOpen(true);
            setKeyword("update");
            setId(id);
            setData(payload);
          }}
        >
          Update
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setOpen(true);
            setKeyword("delete");
            setId(id);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuAction;
