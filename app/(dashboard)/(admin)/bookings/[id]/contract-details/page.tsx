import { GetBookingContract } from "./action";
import { redirect } from "next/navigation";

const BookingContractDetail = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  const response = await GetBookingContract(id);
  if (!response) {
    redirect("/not-found");
  }
  return (
    <div
      className="max-h-[70vh] overflow-y-auto"
      dangerouslySetInnerHTML={{
        __html: response.toString()
      }}
    />
  )
}

export default BookingContractDetail;
