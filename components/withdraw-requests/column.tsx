"use client";

import { ColumnDef } from "@tanstack/react-table";

import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { WithdrawRequestResponse } from "@/constants/models/withdraw-request.model";
import CheckoutButton from "./checkout-button";

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
    header: "User",
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
      return <span>{row.original.amount} Đồng</span>
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CheckoutButton id={row.original.id} />
    },
  },
];
