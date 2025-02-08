import { GetContractStatusResponses } from "@/domains/models/contract-statuses/getContractStatuses.response";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GetContractStatusResponses>[] = [
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
