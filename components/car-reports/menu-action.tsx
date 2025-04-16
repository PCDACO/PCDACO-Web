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
import Link from "next/link";

interface ReportProps {
  id: string;
}

const MenuAction: React.FC<ReportProps> = ({ id }) => {
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
        <DropdownMenuItem >
          <Link href={`/car-reports/${id}`}>
            Chi tiết
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  );
};

export default MenuAction;
