"use client"
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
import { createGenericStore } from "@/stores/store";
import { ManufacturePayload } from "@/constants/models/manufacture.model";
import { useRouter } from "next/navigation";

interface ReportProps {
  id: string;
}

export const useManuFactureStore = createGenericStore<ManufacturePayload>();

const MenuAction: React.FC<ReportProps> = ({ id }) => {
  const { push } = useRouter();
  const handleNavigateDetail = () => {
    push(`/reports/${id}`);
  }
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
        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleNavigateDetail}>
          Chi tiết
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  );
};

export default MenuAction;
