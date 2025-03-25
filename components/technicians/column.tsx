"use client";


import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { TechnicianResponse } from "@/constants/models/technician.model";
import Image from "next/image";

export const TechnicianColumns: ColumnDef<TechnicianResponse>[] = [
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return (
  //       <MenuAction
  //         id={row.original.id}
  //         payload={{
  //           name: row.original.name,
  //           address: row.original.address,
  //           dateOfBirth: row.original.dateOfBirth,
  //           password: "",
  //           email: row.original.email,
  //           phone: row.original.phone,
  //           roleName: row.original.role
  //         }}
  //       />
  //     );
  //   },
  // },
];
