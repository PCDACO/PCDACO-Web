"use client";

import { ColumnDef } from "@tanstack/react-table";

import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { WithdrawRequestResponse } from "@/constants/models/withdraw-request.model";
import CheckoutButton from "./checkout-button";
import { formatCurrency } from "@/lib/formatCurrency";
import { Badge } from "../ui/badge";

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
          <Image width={24} height={24} src={user.avatarUrl !== "" ? user.avatarUrl : "/dummy-avatar.webp"} alt={user.name} />
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
        return <Badge className={`bg-${result?.color} text-black`} >{result.name}</Badge >
      }
      return getBadgeByStatus(row.original.status);
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CheckoutButton id={row.original.id} />
    },
  },
];
