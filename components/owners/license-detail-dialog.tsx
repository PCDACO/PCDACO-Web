"use client"
import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Phone, Mail, Clock, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useOwnerMutation } from "@/hooks/owners/use-owner"
import { formatDate } from "@/lib/utils"
import { OwnerPendingApprovalResponse } from "@/constants/models/owner.model"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface LicenseDetailDialogProps {
  isOpen: boolean,
  onClose: () => void,
  approval: OwnerPendingApprovalResponse | null,
}

export default function LicenseDetailDialog(
  {
    isOpen,
    onClose,
    approval
  }: LicenseDetailDialogProps
) {
  const { patchOwnerMutation } = useOwnerMutation();
  const [activeTab, setActiveTab] = useState("details")
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectionForm, setShowRejectionForm] = useState(false)


  const handleReject = () => {
    if (showRejectionForm) {
      if (rejectionReason.trim()) {
        // Submit rejection with reason
        onClose();
        patchOwnerMutation.mutate({
          id: approval?.id ?? "",
          payload: {
            isApproved: false,
            rejectReason: rejectionReason,
          }
        })
        setShowRejectionForm(false)
        setRejectionReason("")
      }
    } else {
      setShowRejectionForm(true)
    }
  }

  const handleApprove = () => {
    // Submit approval
    console.log("Approved")
    patchOwnerMutation.mutate({
      id: approval?.id ?? "",
      payload: {
        isApproved: true,
        rejectReason: rejectionReason,
      }
    })
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        {approval &&
          (
            <>
              <DialogHeader>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                    <Avatar>
                      <AvatarImage src={approval.avatarUrl} alt={approval.name} />
                      <AvatarFallback>{Array.from(approval.name)[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {/* <User className="h-6 w-6 text-slate-600" /> */}
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{approval.name}</DialogTitle>
                    <DialogDescription>Nộp lúc {approval && formatDate(approval.licenseImageUploadedAt.toString())}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-2" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Chi tiết</TabsTrigger>
                  <TabsTrigger value="documents">Hình ảnh</TabsTrigger>
                  <TabsTrigger value="history">Trạng thái</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Email</h3>
                        <p className="flex items-center text-slate-900">
                          <Mail className="h-4 w-4 mr-2 text-slate-400" />
                          {approval.email}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">SDT</h3>
                        <p className="flex items-center text-slate-900">
                          <Phone className="h-4 w-4 mr-2 text-slate-400" />
                          {approval.phone}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Địa chỉ</h3>
                        <p className="flex items-start text-slate-900">
                          <MapPin className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                          {approval.address}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Số bằng lái</h3>
                        <p className="flex items-center text-slate-900">
                          <FileText className="h-4 w-4 mr-2 text-slate-400" />
                          {approval.licenseNumber}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Nộp lúc</h3>
                        <p className="flex items-center text-slate-900">
                          <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                          {approval?.licenseImageUploadedAt
                            ? formatDate(
                              approval.licenseImageUploadedAt.toString()
                            ) : ""}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Ngày hết hạn</h3>
                        <p className="flex items-center text-slate-900">
                          <Clock className="h-4 w-4 mr-2 text-slate-400" />
                          {approval?.licenseExpiryDate
                            ? formatDate(
                              approval.licenseExpiryDate.toString()
                            )
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-slate-500">Trước</h3>
                      <div className="border rounded-lg overflow-hidden bg-slate-50 aspect-[4/3] relative">
                        <Image
                          src={approval.licenseImageFrontUrl ?? "/placeholder.svg?height=300&width=400"}
                          alt="Front of ID/License"
                          width={400}
                          height={300}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-slate-500">Sau</h3>
                      <div className="border rounded-lg overflow-hidden bg-slate-50 aspect-[4/3] relative">
                        <Image
                          src={approval.licenseImageBackUrl ?? "/placeholder.svg?height=300&width=400"}
                          alt="Back of ID/License"
                          width={400}
                          height={300}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nộp lúc</p>
                        <p className="text-xs text-slate-500">
                          {approval?.licenseImageUploadedAt
                            ? formatDate(
                              approval.licenseImageUploadedAt.toString()
                            )
                            : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Trạng thái</p>
                        <p className="text-xs text-slate-500">Đang chờ xét duyệt</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <Separator className="my-2" />

              {showRejectionForm && (
                <div className="mb-4 p-3 border border-red-100 bg-red-50 rounded-md">
                  <Label htmlFor="rejection-reason" className="text-sm font-medium text-red-800 flex items-center mb-2">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Reason for Rejection
                  </Label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="Please provide a detailed reason for rejecting this application..."
                    className="w-full min-h-[80px] border-red-200 focus:border-red-400 focus:ring-red-400"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
              )}

              <DialogFooter className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center text-sm text-slate-500 order-2 sm:order-1">
                  {activeTab === "details" && "Xem xét dữ liệu trước khi xét duyệt"}
                  {activeTab === "documents" && "Kiểm tra tính chuẩn xác của hình ảnh"}
                  {activeTab === "history" && "Kiểm tra thời gian và trạng thái"}
                </div>
                <div className="flex gap-2 w-full sm:w-auto order-1 sm:order-2">
                  {showRejectionForm ? (
                    <>
                      <Button
                        variant="outline"
                        className="gap-1 sm:flex-grow-0 flex-grow"
                        onClick={() => setShowRejectionForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        className="gap-1 sm:flex-grow-0 flex-grow"
                        onClick={handleReject}
                        disabled={!rejectionReason.trim()}
                      >
                        <XCircle className="h-4 w-4" />
                        Từ chối
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 sm:flex-grow-0 flex-grow"
                        onClick={handleReject}
                      >
                        <XCircle className="h-4 w-4" />
                        Từ chối
                      </Button>
                      <Button className="gap-1 sm:flex-grow-0 flex-grow" onClick={handleApprove}>
                        <CheckCircle className="h-4 w-4" />
                        Xét duyệt
                      </Button>
                    </>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
      </DialogContent>
    </Dialog>
  )
}

