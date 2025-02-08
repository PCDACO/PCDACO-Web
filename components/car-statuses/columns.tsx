import { GetCarStatusesResponse} from "@/domains/models/car-statuses/getCarStatuses.response";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GetCarStatusesResponse>[] = [
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
