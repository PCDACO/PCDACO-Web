
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
import { useRouter } from "next/navigation";

interface MenuActionProps {
  id: string;
  status: string;
  userId: string;
}


const MenuAction: React.FC<MenuActionProps> = ({ id, userId, status }) => {
  const { push } = useRouter();
  const handleNavigateToDetail = () => {
    push(`/users/${userId}`);
  }
  const handleNavigateToCheckout = () => {
    push(`/withdraw-requests/${id}/checkout`);
  }
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
          onClick={handleNavigateToDetail} >
          Chi tiết người dùng
        </DropdownMenuItem>
        {
          status === "Pending" && (
            <DropdownMenuItem
              className="bg-red-200"
              onClick={handleNavigateToCheckout} >
              Thanh toán
            </DropdownMenuItem>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
export default MenuAction;
