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
import { TechnicianPayload } from "@/constants/models/technician.model";

interface MenuActionProps {
  id: string;
  payload: TechnicianPayload;
}

export const useTechnicianStore = createGenericStore<TechnicianPayload>();

const MenuAction: React.FC<MenuActionProps> = ({ id, payload }) => {
  const { setKeyword } = useKeywordStore();
  const { setOpen } = useDialogStore();
  const { setId } = useIdStore();
  const { setData } = useTechnicianStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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