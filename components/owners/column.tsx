"use client";


import { ColumnDef } from "@tanstack/react-table";
import MenuAction from "./menu-action";
import { OwnerResponse } from "@/constants/models/owner.model";
import { formatDate } from "@/lib/utils";

export const OwnerColumns: ColumnDef<OwnerResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "dateOfBirth",
    header: "DOB",
    cell: ({ row }) => {
      return <h1>{formatDate(row.original.dateOfBirth.toString())}</h1>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <MenuAction
          id={row.original.id}
          payload={{
            name: row.original.name,
            address: row.original.address,
            createdAt: row.original.createdAt,
            dateOfBirth: row.original.dateOfBirth,
            email: row.original.email,
            phone: row.original.phone,
            role: row.original.role
          }}
        />
      );
    },
  },
];
