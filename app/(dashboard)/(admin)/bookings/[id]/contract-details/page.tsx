import ContractDetailComponent from "@/components/bookings/contract-detail";
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
  return <ContractDetailComponent id={id} contractHtml={response} />
}

export default BookingContractDetail;
