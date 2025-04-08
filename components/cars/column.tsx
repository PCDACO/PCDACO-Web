"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CarResponse } from "@/constants/models/car.model";
import { Badge } from "../ui/badge";
import MenuAction from "./menu-action";
import { CarStatusString } from "@/constants/enums/car-status.enum";
import { translate } from "@/lib/translate";
import { CarBadge } from "./car-badge";

export const CarColumns: ColumnDef<CarResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "licensePlate",
    header: "Biển Số Xe",
  },
  {
    accessorKey: "modelName",
    header: "Dòng",
  },
  {
    accessorKey: "seat",
    header: "Số Ghế",
  },
  {
    accessorKey: "status",
    header: "Tình Trạng",
    cell: ({ row }) => {
      const status = row.original.status;
      return <CarBadge status={status} />;
    },
  },
  {
    accessorKey: "ownerPhoneNumber",
    header: "SDT",
  },
  {
    id: "action",
    cell: ({ row }) => {
      return <MenuAction id={row.original.id} />;
    },
  },
];
