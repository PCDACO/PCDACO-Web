"use client";

import { ColumnDef } from "@tanstack/react-table";

import MenuAction from "./menu-action";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { WithdrawRequestResponse } from "@/constants/models/withdraw-request.model";

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
      return <Image width={32} height={32} src={user.avatarUrl !== "" ? user.avatarUrl : "/dummy-avatar.webp"} alt={user.name} />;
    }
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.user;
      return <span>{user.name}</span>;
    }
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "description",
    header: "Mô Tả",
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
    id: "actions",
    cell: ({ row }) => {
      return (
        <MenuAction
          id={row.original.id}
        />
      );
    },
  },
];
