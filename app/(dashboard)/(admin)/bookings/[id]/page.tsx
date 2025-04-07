import BookingDetailComponent from "@/components/bookings/detail";
import { GetBookingDetail } from "./action";
import { redirect } from "next/navigation";

export default async function BookingDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const bookingDetailResponse = await GetBookingDetail(id)
  if (!bookingDetailResponse.value) {
    redirect("/not-found");
  }
  return <BookingDetailComponent bookingData={bookingDetailResponse.value} />
}
