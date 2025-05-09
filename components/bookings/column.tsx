"use client";
import { ColumnDef } from "@tanstack/react-table";
import MenuAction from "./menu-action";
import { ListBookingResponse } from "@/constants/models/booking.model";
import { formatCurrency } from "@/lib/formatCurrency";
import { Badge } from "../ui/badge";

const bookingStatusBadges = [
  {
    name: "Pending",
    value: (
      <Badge className="bg-red-800 text-white">Chờ xử lí</Badge>
    )
  },
  {
    name: "Approved",
    value: (
      <Badge className="bg-green-800 text-white">Chấp nhận</Badge>
    )
  },
  {
    name: "Rejected",
    value: (
      <Badge className="bg-orange-700 text-white">Từ chối</Badge>
    )
  },
  {
    name: "ReadyForPickup",
    value: (
      <Badge className="bg-blue-800 text-white">Chờ xử lí</Badge>
    )
  },
  {
    name: "Ongoing",
    value: (
      <Badge className="bg-purple-800 text-white">Sẵn sàng giao xe</Badge>
    )
  },
  {
    name: "Completed",
    value: (
      <Badge className="bg-green-800 text-white">Đã hoàn thành</Badge>
    )
  },
  {
    name: "Done",
    value: (
      <Badge className="bg-blue-800 text-white">Xong</Badge>
    )
  },
  {
    name: "Cancelled",
    value: (
      <Badge className="bg-red-700 text-white">Hủy</Badge>
    )
  },
  {
    name: "Expired",
    value: (
      <Badge className="bg-red-800 text-white">Quá hạn</Badge>
    )
  },
]

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
    header: "Người thuê",
  },
  {
    accessorKey: "ownerName",
    header: "Chủ xe",
  },
  {
    header: "Tổng tiền",
    cell: ({ row }) => {
      const total = row.original.totalAmount;
      return <span>{formatCurrency(total)}</span>
    }
  },
  {
    header: "Trạng thái",
    cell: ({ row }) => {
      const mapStatusBadge = (value: string) => {
        const result = bookingStatusBadges.find(item => item.name === value);
        if (!result) {
          return <Badge variant="outline"></Badge>
        }
        return result.value;
      }
      const status = row.original.status;
      return mapStatusBadge(status);
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
