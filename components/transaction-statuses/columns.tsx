import { GetTransactionStatusesResponse } from "@/domains/models/transaction-statuses/getTracsactionStatuses.response";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GetTransactionStatusesResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
