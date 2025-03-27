"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button";

interface Props {
  id: string;
}
export default function CheckoutButton({ id }: Props) {
  const { replace } = useRouter();
  const handleClick = () => {
    replace(`/withdraw-requests/${id}/checkout/`);
  }
  return <>
    <Button onClick={handleClick}  >Chuyển Tiền</Button>
  </>
}
