"use client";


import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { TechnicianResponse } from "@/constants/models/technician.model";
import MenuAction from "./menu-action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const TechnicianColumns: ColumnDef<TechnicianResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    header: "Avatar",
    cell: ({ row }) => {
      const avatarUrl = row.original.avatarUrl;
      return (
        <Avatar>
          <AvatarImage src={avatarUrl} alt={row.original.id} />
          <AvatarFallback>
            {Array.from(row.original.name)[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )
    }
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "phone",
    header: "Số Điện Thoại",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Địa Chỉ",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Ngày Sinh",
    cell: ({ row }) => {
      return <h1>{formatDate(row.original.dateOfBirth.toString())}</h1>
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
