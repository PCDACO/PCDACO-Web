import BookingStatusesTable from "@/components/booking-statuses/booking-statuses-table";
import { columns } from "@/components/booking-statuses/columns";
import { GetBookingStatuses } from "./action";

export const dynamic = "force-dynamic";
export default async function BookingStatusPage() {
    const { value } = await GetBookingStatuses({ index: 1, size: 10, keyword: "" });
    return (
        <BookingStatusesTable columns={columns} data={value!} />
    )
}