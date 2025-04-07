"use client";


import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { ConsultantResponse } from "@/constants/models/consultant.model";
import Image from "next/image";
import MenuAction from "./menu-action";

export const ConsultantColumns: ColumnDef<ConsultantResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "avatarUrl",
    header: "",
    cell: ({ row }) => {
      const avatarUrl = row.original.avatarUrl;
      return <Image width={32} height={32} src={avatarUrl !== "" ? avatarUrl : "/dummy-avatar.webp"} alt={row.original.name} />;
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
