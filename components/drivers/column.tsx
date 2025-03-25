"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { DriverResponse } from "@/constants/models/driver.model";
import Image from "next/image";

export const DriverColumns: ColumnDef<DriverResponse>[] = [
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return (
  //       <MenuAction
  //         id={row.original.id}
  //         payload={{
  //           name: row.original.name,
  //           address: row.original.address,
  //           createdAt: row.original.createdAt,
  //           dateOfBirth: row.original.dateOfBirth,
  //           email: row.original.email,
  //           phone: row.original.phone,
  //           role: row.original.role
  //         }}
  //       />
  //     );
  //   },
  // },
];
