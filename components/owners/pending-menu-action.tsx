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
import LicenseDetailDialog from "./license-detail-dialog";
import { OwnerApprovalPayload } from "@/constants/models/owner.model";

interface MenuActionProps {
  id: string;
  payload: OwnerApprovalPayload;
}

export const useOwnerApprovalPayload = createGenericStore<OwnerApprovalPayload>();


const MenuAction: React.FC<MenuActionProps> = ({ id, payload }) => {
  const { setKeyword } = useKeywordStore();
  const { open, setOpen } = useDialogStore();
  const { setId } = useIdStore();
  const { setData } = useOwnerApprovalPayload();

  return (
    <>
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
            onClick={() => {
              setKeyword("update");
              setOpen(true);
              setId(id);
              setData(payload);
            }}
          >
            Chi tiết
          </DropdownMenuItem>
        </DropdownMenuContent >
      </DropdownMenu>
      <LicenseDetailDialog isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default MenuAction;
