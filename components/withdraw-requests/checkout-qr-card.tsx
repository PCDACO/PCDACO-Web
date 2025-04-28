"use client"
import { WithdrawRequestQRResponse } from "@/constants/models/withdraw-request.model"
import { useState } from "react";
import Image from "next/image"
import { Copy, Check, CheckIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import WithdrawRequestForm from "./checkout-form";

interface Props {
  id: string;
  qrInfo: WithdrawRequestQRResponse;
}
export default function CheckoutQRComponent({ id, qrInfo }: Props) {
  const [copied, setCopied] = useState<string | null>(null)


  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <Dialog>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Quét QR để thanh toán</CardTitle>
          <CardDescription>Quét QR này để hoàn tất thanh toán</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative w-64 h-64 border rounded-lg overflow-hidden">
              {qrInfo.qrCodeUrl ? (
                <Image src={qrInfo.qrCodeUrl || "/placeholder.svg"} alt="Payment QR Code" fill className="object-contain p-2" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">QR không khả dụng</div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tổng cộng</span>
              <span className="font-semibold text-lg">{formatCurrency(qrInfo.amount)}</span>
            </div>
            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ngân hàng</span>
                <span>{qrInfo.bankName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Chủ tài khoản</span>
                <div className="flex items-center gap-2">
                  <span>{qrInfo.accountName}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(qrInfo.accountName, "name")}
                  >
                    {copied === "name" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Số tài khoản</span>
                <div className="flex items-center gap-2">
                  <span>{qrInfo.accountNumber}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(qrInfo.accountNumber, "number")}
                  >
                    {copied === "number" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {qrInfo.description && (
              <>
                <Separator />
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Chi tiết</span>
                  <p className="text-sm">{qrInfo.description}</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="w-full">
          <DialogTrigger className="w-full mx-auto">
            <Button variant="outline">
              <CheckIcon />
              Hoàn Tất
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <DialogContent>
        <WithdrawRequestForm id={id} />
      </DialogContent>
    </Dialog>
  )
}
