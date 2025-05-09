"use client";

import { ColumnDef } from "@tanstack/react-table";

import { formatDate } from "@/lib/utils";
import { WithdrawRequestResponse } from "@/constants/models/withdraw-request.model";
import { formatCurrency } from "@/lib/formatCurrency";
import { Badge } from "../ui/badge";
import MenuAction from "./menu-action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const WithdrawalRequestStatus = [
  {
    name: "Đang diễn ra",
    value: "Pending",
    color: "#26FC46"
  },
  {
    name: "Đã hoàn thành",
    value: "Completed",
    color: "#FCDF26"
  },
  {
    name: "Đã từ chối",
    value: "Rejected",
    color: "#264AFC"
  },
  {
    name: "Đã hủy",
    value: "Cancelled",
    color: "#9126FC"
  },
]

export const WithdrawRequestColumn: ColumnDef<WithdrawRequestResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "user",
    header: "Người dùng",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex w-full justify-start items-center">
          <Avatar  >
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{Array.from(user.name)[0].toUpperCase()}</AvatarFallback>
          </Avatar  >
          <span className="ml-4 text-sm">{user.name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "amount",
    header: "Lượng Tiền",
    cell: ({ row }) => {
      return <span>{formatCurrency(row.original.amount)}</span>
    }
  },
  {
    accessorKey: "createdAt",
    header: "Tạo Lúc",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return formatDate(createdAt.toString());
    }
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const getBadgeByStatus = (status: string) => {
        const result = WithdrawalRequestStatus.find((item) => item.value === status)
        if (!result) return <Badge variant="outline">Unknown</Badge>
        return <Badge style={{ backgroundColor: result.color, color: "black" }} >{result.name}</Badge >
      }
      return getBadgeByStatus(row.original.status);
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // return <CheckoutButton id={row.original.id} />
      return <MenuAction id={row.original.id} userId={row.original.user.id} status={row.original.status} />
    },
  },
];
