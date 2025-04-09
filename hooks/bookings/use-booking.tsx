import { GetBookings } from "@/app/(dashboard)/(admin)/bookings/action"
import { BookingParams } from "@/constants/models/booking.model"
import { useQuery } from "@tanstack/react-query"

interface Props {
  params: BookingParams
}

export const useBookingQuery = ({
  params
}: Props) => {
  const listBookings = useQuery({
    queryKey: ["bookings"],
    queryFn: () => GetBookings(params),
  });
  return {
    listBookings
  }
}
