"use client"
import { useState } from "react"
import { Calendar, Car, CheckCircle, Clock, DollarSign, FileText, Image, MapPin, Phone, XCircle } from "lucide-react"
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
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function ReportDetails() {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [resolutionComments, setResolutionComments] = useState("")
  const { replace } = useRouter();

  const report = {
    id: "4c1e6015-beeb-4f6c-89c5-9fd47d8bbb0c",
    reporterId: "b6d86c42-5169-4ee8-bf70-ade9f69a782c",
    reportedName: "Nguyễn Văn A",
    title: "Báo cáo hư hỏng xe",
    description: "Xe bị trầy xước nhẹ",
    reportType: "CarDamage",
    status: "Pending",
    resolvedAt: null,
    resolvedById: null,
    resolutionComments: null,
    imageUrls: ["https://example.com/report1.jpg"],
    bookingDetail: {
      id: "e7530c21-73de-4bc7-a953-4fe241a4a1e4",
      driverId: "55617fd3-dc97-4c91-8ff3-245a07b1b81a",
      driverName: "Nguyễn Văn B",
      driverAvatar: "https://example.com/avatar1.jpg",
      driverPhone: "0123456789",
      ownerId: "196faf43-bfa0-45b2-a1ec-b78757d2edbe",
      ownerName: "Trần Văn C",
      ownerAvatar: "https://example.com/avatar2.jpg",
      ownerPhone: "0987654321",
      startTime: "2025-03-28T09:21:29.2738347Z",
      endTime: "2025-03-31T09:21:29.2738398Z",
      totalAmount: 2200000,
      basePrice: 2000000,
    },
    carDetail: {
      id: "9d6657bb-728e-486e-b71d-ba6aee81579a",
      licensePlate: "51G-123.45",
      modelName: "Toyota Camry",
      manufacturerName: "Toyota",
      color: "Đen",
      imageUrl: ["https://example.com/car1.jpg"],
    },
    compensationDetail: {
      userId: "6261d662-fde6-4be5-9de0-a8250c90b51b",
      userName: "Nguyễn Văn D",
      userAvatar: "https://example.com/avatar3.jpg",
      compensationReason: "Trầy xước xe",
      compensationAmount: 500000,
      isPaid: false,
      imageUrl: null,
      paidAt: null,
    },
    inspectionScheduleDetail: {
      id: "4e64a800-2116-4453-b1f1-677ea68759b6",
      technicianId: "fc837c83-8db6-49fa-885d-dd7dc02aa44f",
      technicianName: "Lê Văn E",
      technicianAvatar: "https://example.com/avatar4.jpg",
      status: "Scheduled",
      inspectionAddress: "123 Đường ABC, Quận 1, TP.HCM",
      inspectionDate: "2025-03-29T09:21:29.2738618Z",
      note: "Kiểm tra trầy xước",
      photoUrls: ["https://example.com/inspection1.jpg"],
    },
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

  const handleReject = () => {
    // toast({
    //   title: "Báo cáo đã bị từ chối",
    //   description: `Báo cáo #${report.id.substring(0, 8)} đã bị từ chối với lý do: ${resolutionComments}`,
    // })
    setIsRejectDialogOpen(false);
  }

  const handleApprove = () => {
    // toast({
    //   title: "Báo cáo đã được chấp nhận",
    //   description: `Báo cáo #${report.id.substring(0, 8)} đã được chấp nhận với ghi chú: ${resolutionComments}`,
    // })
    setIsApproveDialogOpen(false);
    replace("inspection-schedules/create");
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{report.title}</h1>
            <p className="text-muted-foreground">ID: {report.id}</p>
          </div>
          <Badge
            className="px-3 py-1 text-sm"
            variant={report.status === "Pending" ? "outline" : report.status === "Approved" ? "default" : "destructive"}
          >
            {report.status}
          </Badge>
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
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={report.reportedName} />
                  <AvatarFallback>{report.reportedName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{report.reportedName}</p>
                  <p className="text-sm text-muted-foreground">Người báo cáo</p>
                </div>
              </div>

              <div>
                <p className="font-medium">Mô tả</p>
                <p>{report.description}</p>
              </div>

              <div>
                <p className="font-medium">Loại báo cáo</p>
                <p>{report.reportType}</p>
              </div>

              {report.imageUrls && report.imageUrls.length > 0 && (
                <div>
                  <p className="font-medium mb-2 flex items-center gap-1">
                    <Image className="h-4 w-4" />
                    Hình ảnh
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {report.imageUrls.map((_, index) => (
                      <div key={index} className="relative aspect-video rounded-md overflow-hidden border">
                        <img
                          src="/placeholder.svg?height=120&width=200"
                          alt={`Report image ${index + 1}`}
                          className="object-cover w-full h-full"
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
              <div className="aspect-video rounded-md overflow-hidden border">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt={report.carDetail.modelName}
                  className="object-cover w-full h-full"
                />
              </div>

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
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={report.compensationDetail.userName} />
                  <AvatarFallback>{report.compensationDetail.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{report.compensationDetail.userName}</p>
                  <p className="text-sm text-muted-foreground">Người nhận bồi thường</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Lý do bồi thường</p>
                <p className="font-medium">{report.compensationDetail.compensationReason}</p>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Số tiền bồi thường</p>
                  <p className="font-medium text-lg">{formatCurrency(report.compensationDetail.compensationAmount)}</p>
                </div>
                <Badge variant={report.compensationDetail.isPaid ? "default" : "outline"}>
                  {report.compensationDetail.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </Badge>
              </div>

              {report.compensationDetail.paidAt && (
                <div>
                  <p className="text-sm text-muted-foreground">Ngày thanh toán</p>
                  <p className="font-medium">{formatDate(report.compensationDetail.paidAt)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Inspection Schedule */}
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
                    alt={report.inspectionScheduleDetail.technicianName}
                  />
                  <AvatarFallback>{report.inspectionScheduleDetail.technicianName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{report.inspectionScheduleDetail.technicianName}</p>
                  <p className="text-sm text-muted-foreground">Kỹ thuật viên</p>
                </div>
                <Badge className="ml-auto" variant="outline">
                  {report.inspectionScheduleDetail.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Địa chỉ kiểm tra
                  </p>
                  <p className="font-medium">{report.inspectionScheduleDetail.inspectionAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Ngày kiểm tra
                  </p>
                  <p className="font-medium">{formatDate(report.inspectionScheduleDetail.inspectionDate)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Ghi chú</p>
                <p className="font-medium">{report.inspectionScheduleDetail.note}</p>
              </div>

              {report.inspectionScheduleDetail.photoUrls && report.inspectionScheduleDetail.photoUrls.length > 0 && (
                <div>
                  <p className="font-medium mb-2 flex items-center gap-1">
                    <Image className="h-4 w-4" />
                    Hình ảnh kiểm tra
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {report.inspectionScheduleDetail.photoUrls.map((_, index) => (
                      <div key={index} className="relative aspect-video rounded-md overflow-hidden border">
                        <img
                          src="/placeholder.svg?height=120&width=200"
                          alt={`Inspection image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
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

          <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Chấp nhận báo cáo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Chấp nhận báo cáo</DialogTitle>
                <DialogDescription>Bạn có thể thêm ghi chú khi chấp nhận báo cáo này.</DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Nhập ghi chú (không bắt buộc)..."
                value={resolutionComments}
                onChange={(e) => setResolutionComments(e.target.value)}
                className="min-h-[100px]"
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleApprove}>Xác nhận chấp nhận</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

