import CheckoutQRComponent from "@/components/withdraw-requests/checkout-qr-card";
import { GenerateQRCode } from "./action";

export default async function CheckoutPage(
  { params }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params;
  const response = await GenerateQRCode(id);
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <CheckoutQRComponent id={id} qrInfo={response.value} />
    </main>
  )
}
