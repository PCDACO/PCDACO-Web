import { GetCompensationStatusesResponse } from "@/domains/models/compensation-statuses/getCompensationStatuses.response";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GetCompensationStatusesResponse>[] = [
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
