import { GetBookingStatusesResponse} from "@/domains/models/booking-statuses/getBookingStatuses.response";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GetBookingStatusesResponse>[] = [
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
