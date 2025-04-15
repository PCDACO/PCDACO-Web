"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button";

interface Props {
  id: string;
}
export default function CheckoutButton({ id }: Props) {
  const { push } = useRouter();
  const handleClick = () => {
    push(`/withdraw-requests/${id}/checkout/`);
  }
  return <>
    <Button variant="outline" onClick={handleClick}>Chuyển Tiền</Button>
  </>
}
