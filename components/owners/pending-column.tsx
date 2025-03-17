"use client";
import { ColumnDef } from "@tanstack/react-table";
import MenuAction from "./pending-menu-action";
import { OwnerPendingApprovalResponse } from "@/constants/models/owner.model";
import { formatDate } from "@/lib/utils";

export const PendingOwnerColumns: ColumnDef<OwnerPendingApprovalResponse>[] = [
  {
    accessorKey: "index",
    header: "STT",
    cell: ({ row }) => {
      return row.index + 1
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
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <MenuAction
          id={row.original.id}
          payload={{
            isApproved: false,
            rejectReason: "",
          }}
        />
      );
    },
  },
];
