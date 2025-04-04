"use client"
import { useState } from "react"
import { Calendar, Car, CheckCircle, Clock, DollarSign, FileText, ImageIcon, MapPin, Phone, XCircle } from "lucide-react"
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { ReportDetailResponse } from "@/constants/models/report.model"
import { useReportMutation } from "@/hooks/reports/use-report";
import ReportDetailMenuAction from "./detail-menu-action";
import CompensationForm from "../compensations/form";
import ApproveReportForm from "./approve-form";
import { formatId } from "@/lib/format-uuid";

interface Props {
  report: ReportDetailResponse
}
export default function ReportDetails({ report }: Props) {
  const [compensationOpen, setCompensationOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [resolutionComments, setResolutionComments] = useState("")
  const { rejectReport } = useReportMutation();
  const { push } = useRouter();
  const handleCreateNewInspectionClick = () => {
    push(`/inspection-schedules/create?carId=${report?.carDetail?.id ?? ""}`);
  }

  const handleApproveReportClick = () => {
    setApproveOpen(true);
  }

  const mapReportType = (type: number): JSX.Element => {
    switch (type) {
      case 0:
        return (
          <Badge className="bg-red-500 text-white">
            Tranh cãi
          </Badge>
        );
      case 1:
        return (
          <Badge className="bg-yellow-500 text-white">
            Tai nạn
          </Badge>
        );
      case 2:
        return (
          <Badge className="bg-purple-500 text-white">
            Báo phạt
          </Badge>
        );
      case 3:
        return (
          <Badge className="bg-orange-500 text-white">
            Hư hỏng
          </Badge>
        );
      case 4:
        return (
          <Badge className="bg-green-500 text-white">
            Bảo trì
          </Badge>
        );
      case 5:
        return (
          <Badge className="bg-blue-500 text-white">
            Khác
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500 text-white">
            Error
          </Badge>
        );
    }
  };

  const handleReject = () => {
    rejectReport.mutate({
      id: report.id,
      reason: resolutionComments
    });
    setIsRejectDialogOpen(false);
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return <>
    {report && (
      <>
        <div className="container mx-auto py-6 max-w-6xl">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col md:flex-col justify-start items-start md:items-center gap-4 w-full">
              <div className=" flex flex-row justify-between w-full">
                <div className="flex flex-col items-start w-full">
                  <h1 className="text-2xl font-bold">{report.title}</h1>
                  <p className="text-muted-foreground-foreground ml-2">Id: {formatId(report.id)}</p>
                </div>
                <ReportDetailMenuAction setOpen={() => setCompensationOpen(true)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Report Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Thông tin báo cáo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={report.reporterName} />
                        <AvatarFallback>{report.reporterName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{report.reporterName}</p>
                        <p className="text-sm text-muted-foreground">Người báo cáo</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Mô tả</p>
                      <p>{report.description}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Loại báo cáo</p>
                      {mapReportType(report.reportType)}
                    </div>
                    {report.imageUrls && report.imageUrls.length > 0 && (
                      <div>
                        <p className="font-medium mb-2 flex items-center gap-1">
                          <ImageIcon className="h-4 w-4" />
                          Hình ảnh
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {report.imageUrls.map((imageUrl, index) => (
                            <div key={index} className="relative aspect-video rounded-md overflow-hidden border">
                              <Image
                                src={imageUrl ?? "/placeholder.svg?height=120&width=200"}
                                alt={`Report image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                {/* Car Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      Thông tin xe
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {report?.carDetail?.imageUrl?.length > 0 && (
                      <div className="aspect-video rounded-md overflow-hidden border">
                        {report?.carDetail?.imageUrl?.map((url) => (
                          <Image
                            key={url}
                            src={url ?? "/placeholder.svg?height=200&width=400"}
                            alt={report.carDetail.modelName}
                            width={400}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        ))}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Biển số xe</p>
                        <p className="font-medium">{report.carDetail.licensePlate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Màu sắc</p>
                        <p className="font-medium">{report.carDetail.color}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mẫu xe</p>
                        <p className="font-medium">{report.carDetail.modelName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Hãng sản xuất</p>
                        <p className="font-medium">{report.carDetail.manufacturerName}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Booking Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Thông tin đặt xe
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={report.bookingDetail.driverName} />
                          <AvatarFallback>{report.bookingDetail.driverName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{report.bookingDetail.driverName}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {report.bookingDetail.driverPhone}
                          </div>
                          <p className="text-sm text-muted-foreground">Người thuê</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={report.bookingDetail.ownerName} />
                          <AvatarFallback>{report.bookingDetail.ownerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{report.bookingDetail.ownerName}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {report.bookingDetail.ownerPhone}
                          </div>
                          <p className="text-sm text-muted-foreground">Chủ xe</p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Thời gian bắt đầu
                        </p>
                        <p className="font-medium">{formatDate(report.bookingDetail.startTime)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Thời gian kết thúc
                        </p>
                        <p className="font-medium">{formatDate(report.bookingDetail.endTime)}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Giá cơ bản</p>
                        <p className="font-medium">{formatCurrency(report.bookingDetail.basePrice)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tổng tiền</p>
                        <p className="font-medium">{formatCurrency(report.bookingDetail.totalAmount)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Compensation Details */}
                {report?.compensationDetail && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Thông tin bồi thường
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt={report?.compensationDetail?.userName ?? ""}
                          />
                          <AvatarFallback>{report?.compensationDetail?.userName?.charAt(0) ?? ""}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{report?.compensationDetail?.userName ?? ""}</p>
                          <p className="text-sm text-muted-foreground">Người nhận bồi thường</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Lý do bồi thường</p>
                        <p className="font-medium">{report?.compensationDetail?.compensationReason ?? ""}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Số tiền bồi thường</p>
                          <p className="font-medium text-lg">
                            {formatCurrency(report?.compensationDetail?.compensationAmount ?? 0)}
                          </p>
                        </div>
                        {report?.compensationDetail?.isPaid && (
                          <Badge variant={report.compensationDetail.isPaid ? "default" : "outline"}>
                            {report.compensationDetail.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                          </Badge>
                        )}
                      </div>

                      {report?.compensationDetail?.paidAt && (
                        <div>
                          <p className="text-sm text-muted-foreground">Ngày thanh toán</p>
                          <p className="font-medium">{formatDate(report.compensationDetail.paidAt)}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                {/* Inspection Schedule Details */}
                {report?.inspectionScheduleDetail && (
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Lịch kiểm tra
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt={report?.inspectionScheduleDetail?.technicianName ?? ""}
                          />
                          <AvatarFallback>
                            {report?.inspectionScheduleDetail?.technicianName?.charAt(0) ?? ""}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{report?.inspectionScheduleDetail?.technicianName ?? ""}</p>
                          <p className="text-sm text-muted-foreground">Kỹ thuật viên</p>
                        </div>
                        <Badge className="ml-auto" variant="outline">
                          {report?.inspectionScheduleDetail?.status ?? ""}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            Địa chỉ kiểm tra
                          </p>
                          <p className="font-medium">{report?.inspectionScheduleDetail?.inspectionAddress ?? ""}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Ngày kiểm tra
                          </p>
                          {report?.inspectionScheduleDetail?.inspectionDate && (
                            <p className="font-medium">
                              {formatDate(report?.inspectionScheduleDetail?.inspectionDate ?? "")}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Ghi chú</p>
                        <p className="font-medium">{report?.inspectionScheduleDetail?.note ?? ""}</p>
                      </div>

                      {report?.inspectionScheduleDetail?.photoUrls &&
                        report.inspectionScheduleDetail.photoUrls.length > 0 && (
                          <div>
                            <p className="font-medium mb-2 flex items-center gap-1">
                              <ImageIcon className="h-4 w-4" />
                              Hình ảnh kiểm tra
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              {report?.inspectionScheduleDetail?.photoUrls?.map((imageUrl, index) => (
                                <div key={index} className="relative aspect-video rounded-md overflow-hidden border">
                                  <Image
                                    src={imageUrl ?? "/placeholder.svg?height=120&width=200"}
                                    alt={`Inspection image ${index + 1}`}
                                    width={200}
                                    height={120}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              )) ?? []}
                            </div>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className="flex flex-row justify-end w-full items-center mt-4">
                <div className="flex w-full justify-end gap-4 mt-4">
                  <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <XCircle className="h-4 w-4" />
                        Từ chối báo cáo
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Từ chối báo cáo</DialogTitle>
                        <DialogDescription>Vui lòng nhập lý do từ chối báo cáo này.</DialogDescription>
                      </DialogHeader>
                      <Textarea
                        placeholder="Nhập lý do từ chối..."
                        value={resolutionComments}
                        onChange={(e) => setResolutionComments(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                          Hủy
                        </Button>
                        <Button variant="destructive" onClick={handleReject}>
                          Xác nhận từ chối
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {report.compensationDetail && (
                    <Button onClick={handleApproveReportClick} className="gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Chấp nhận đền bù
                    </Button>
                  )}
                  {!report.compensationDetail && (
                    <Button onClick={handleCreateNewInspectionClick} className="gap-2">
                      Tạo lịch
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div >
        <CompensationForm
          id={report.id}
          userId={report.bookingDetail.driverId}
          isOpen={compensationOpen}
          onOpenChange={() => setCompensationOpen(!compensationOpen)}
        />
        <ApproveReportForm
          id={report.id}
          value={{
            note: "",
            images: new DataTransfer().files
          }}
          isOpen={approveOpen}
          onOpenChange={() => setApproveOpen(!approveOpen)} />
      </>
    )}
  </>
}

