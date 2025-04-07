import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createGenericStore, } from "@/stores/store";
import { ConsultantPayload } from "@/constants/models/consultant.model";
import { useRouter } from "next/navigation";

interface MenuActionProps {
  id: string;
}

export const useConsultantStore = createGenericStore<ConsultantPayload>();

const MenuAction: React.FC<MenuActionProps> = ({ id }) => {
  const { push } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Tùy Chọn</DropdownMenuLabel>
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => { push(`/users/${id}`) }}
        >
          Chi tiết
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuAction;
