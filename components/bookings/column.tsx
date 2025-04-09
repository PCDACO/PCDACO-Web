"use client";
import { ColumnDef } from "@tanstack/react-table";
import MenuAction from "./menu-action";
import { ListBookingResponse } from "@/constants/models/booking.model";
import { formatCurrency } from "@/lib/formatCurrency";

export const BookingColumns: ColumnDef<ListBookingResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "driverName",
    header: "Driver",
  },
  {
    accessorKey: "ownerName",
    header: "Owner",
  },
  {
    header: "Total",
    cell: ({ row }) => {
      const total = row.original.totalAmount;
      return <span>{formatCurrency(total)}</span>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <MenuAction id={row.original.id} />
      );
    },
  },
];
