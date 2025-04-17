"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Calendar, CheckCircleIcon, MapPin, Shield, User, Wrench, XIcon } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { CarReportDetailResponse } from "@/constants/models/car-report.model"
import { formatId } from "@/lib/format-uuid"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useCarReportMutation } from "@/hooks/car-reports/use-car-reports"
import { ChangeEvent, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface Props {
  report: CarReportDetailResponse;
}

const CarReportDetailComponent = ({ report }: Props) => {
  const { push } = useRouter();
  const { approveCarReport, rejectCarReport } = useCarReportMutation();
  const [note, setNote] = useState("");
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNote(e.currentTarget.value);
  }

  const handleNavigateCreateInspectionDetail = () => {
    push(`/inspection-schedules/create?carId=${report.carDetail.id}&reportId=${report.id}&type=gps-unassign`);
  }
  // Determine status color
  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "Pending":
  //       return "bg-yellow-100 text-yellow-800"
  //     case "UnderReview":
  //       return "bg-green-100 text-green-800"
  //     case "Resolved":
  //       return "bg-blue-100 text-blue-800"
  //     case "Rejected":
  //       return "bg-red-100 text-red-800"
  //     default:
  //       return "bg-gray-100 text-gray-800"
  //   }
  // }

  const handleApproveCarReport = () => {
    approveCarReport.mutate({
      id: report.id,
      note: note
    });
  }

  const handleRejectCarReport = () => {
    rejectCarReport.mutate({
      id: report.id,
      note: note
    });
  }
  // Determine report type display
  const getReportTypeDisplay = (type: string) => {
    switch (type) {
      case "GPSChange":
        return "Thay đổi GPS"
      case "Deactivation":
        return "Hủy kích hoạt xe"
      case "BodyDamage":
        return "Hư hỏng thân xe"
      default:
        return "Báo cáo khác"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{report.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            {/* <Badge className={getStatusColor(report.status)}>{report.status}</Badge> */}
            <span className="text-sm text-muted-foreground">ID: {formatId(report.id)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {report.status === "Pending" && <Button>Xử lý báo cáo</Button>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Report details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết báo cáo</CardTitle>
              <CardDescription>Loại báo cáo: {getReportTypeDisplay(report.reportType)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Mô tả</h3>
                <p className="text-muted-foreground">{report.description}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Người báo cáo</h3>
                <div className="flex items-center gap-3">
                  <div className="bg-muted rounded-full p-2">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{report.reporterName}</p>
                    <p className="text-sm text-muted-foreground">{report.reporterRole}</p>
                  </div>
                </div>
              </div>

              {report.imageUrls && report.imageUrls.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Hình ảnh báo cáo</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {report.imageUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                        <Image
                          src={url && (url !== "" ? url : "/placeholder.png")}
                          alt={`Report image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {report.resolvedAt && (
                <div>
                  <h3 className="font-medium mb-2">Thông tin xử lý</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm">
                      <span className="font-medium">Thời gian xử lý:</span> {formatDate(report.resolvedAt)}
                    </p>
                    {report.resolutionComments && (
                      <p className="text-sm mt-2">
                        <span className="font-medium">Ghi chú:</span> {report.resolutionComments}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Inspection Schedule Details */}
          {report.inspectionScheduleDetail && (
            <Card>
              <CardHeader>
                <CardTitle>Lịch kiểm tra</CardTitle>
                <CardDescription>Trạng thái: {report.inspectionScheduleDetail.status}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-full p-2">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ngày kiểm tra</p>
                      <p className="font-medium">{formatDate(report.inspectionScheduleDetail.inspectionDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-full p-2">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Địa điểm</p>
                      <p className="font-medium">{report.inspectionScheduleDetail.inspectionAddress}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Kỹ thuật viên</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Avatar>
                        <AvatarImage
                          src={report?.inspectionScheduleDetail?.technicianAvatar}
                          alt={report?.inspectionScheduleDetail?.technicianName ?? ""}
                        />
                        <AvatarFallback >
                          {Array.from(report?.inspectionScheduleDetail?.technicianName)[0].toUpperCase()}
                        </AvatarFallback >
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-medium">{report.inspectionScheduleDetail.technicianName}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: {report.inspectionScheduleDetail.technicianId.substring(0, 8)}...
                      </p>
                    </div>
                  </div>
                </div>

                {report.inspectionScheduleDetail.note && (
                  <div>
                    <h3 className="font-medium mb-2">Ghi chú</h3>
                    <p className="text-muted-foreground">{report.inspectionScheduleDetail.note}</p>
                  </div>
                )}

                {report.inspectionScheduleDetail.photoUrls && report.inspectionScheduleDetail.photoUrls.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Hình ảnh kiểm tra</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {report.inspectionScheduleDetail.photoUrls.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                          <Image
                            src={url && (url !== "" ? url : "/placeholder.png")}
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
          )}
        </div>

        {/* Right column - Car details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin xe</CardTitle>
              <CardDescription>
                {report.carDetail.manufacturerName} {report.carDetail.modelName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-video rounded-md overflow-hidden border">
                {
                  report?.carDetail?.imageUrl && (
                    <Image
                      src={report?.carDetail?.imageUrl[0] ?? "/placeholder.svg"}
                      alt={`Report image`}
                      fill
                      className="object-cover"
                    />
                  )
                }
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
              </div>

              <Separator />

              {/* Action buttons based on report type */}
              <div className="space-y-3">
                <div className="space-y-2">
                  {
                    report.inspectionScheduleDetail && report.status === "UnderReview" && (
                      <>
                        <h3 className="font-medium">Hành động</h3>
                        <Dialog >
                          <DialogTrigger className="w-full">
                            <Button className="w-full" variant="destructive">
                              <XIcon className="mr-2 h-4 w-4" />
                              Từ chối
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle> Từ chối thay đổi </DialogTitle>
                            </DialogHeader>
                            <h1 className="text-muted-foreground">Bạn có chắc chắn không ?</h1>
                            <Label>Note</Label>
                            <Input placeholder="Nhập note" value={note} onChange={handleNoteChange} />
                            <DialogFooter>
                              <Button onClick={handleRejectCarReport} variant="outline">
                                <CheckCircleIcon className="mr-2 h-4 w-4" />
                                Xác nhận
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Dialog >
                          <DialogTrigger className="w-full">
                            <Button className="w-full" variant="outline">
                              <Shield className="mr-2 h-4 w-4" />
                              Xác nhận thay đổi GPS
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle> Xác nhận thay đổi </DialogTitle>
                            </DialogHeader>
                            <h1 className="text-muted-foreground">Bạn có chắc chắn không ?</h1>
                            <Label>Note</Label>
                            <Input placeholder="Nhập note" value={note} onChange={handleNoteChange} />
                            <DialogFooter>
                              <Button onClick={handleApproveCarReport} variant="outline">
                                <CheckCircleIcon className="mr-2 h-4 w-4" />
                                Xác nhận
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    )
                  }
                  {
                    !report.inspectionScheduleDetail && (
                      <Button onClick={handleNavigateCreateInspectionDetail} className="w-full" variant="outline">
                        <Wrench className="mr-2 h-4 w-4" />
                        Lên lịch thay GPS
                      </Button>
                    )
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lịch sử báo cáo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-muted rounded-full p-2 mt-0.5">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Báo cáo được tạo</p>
                    <p className="text-xs text-muted-foreground">17/04/2025, 10:17</p>
                    <p className="text-sm mt-1">{report.reporterName} đã tạo báo cáo</p>
                  </div>
                </div>

                {report.inspectionScheduleDetail && (
                  <div className="flex items-start gap-3">
                    <div className="bg-muted rounded-full p-2 mt-0.5">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lịch kiểm tra được tạo</p>
                      <p className="text-xs text-muted-foreground">17/04/2025, 11:30</p>
                      <p className="text-sm mt-1">
                        Lịch kiểm tra đã được lên với kỹ thuật viên {report.inspectionScheduleDetail.technicianName}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  )
}

export default CarReportDetailComponent;
