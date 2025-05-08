"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Calendar, CheckCircle, Clock2, MapPin, User, XCircle } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { CarReportDetailResponse } from "@/constants/models/car-report.model"
import { formatId } from "@/lib/format-uuid"
import { useRouter } from "next/navigation"
import { CarReportStatus } from "@/constants/enums/car-report-status.enum"
import { Badge } from "../ui/badge"
import { CarReportTypeEnum } from "@/constants/enums/car-report-type.enum"
import { ChangeEvent, useState } from "react"
import { useCarReportMutation } from "@/hooks/car-reports/use-car-reports"
import ApproveCarReportDialog from "./approve-report"
import { RejectReportDialog } from "./reject-report-dialog"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"

interface Props {
  report: CarReportDetailResponse;
}

const CarReportDetailComponent = ({ report }: Props) => {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const { rejectCarReport } = useCarReportMutation();
  const [resolutionComments, setResolutionComments] = useState("");
  const [approveOpen, setApproveOpen] = useState(false);
  const { push } = useRouter();
  const handleApproveReportClick = () => {
    setApproveOpen(true);
  };

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


  console.log(report);
  const handleReject = () => {
    rejectCarReport.mutate({
      id: report.id,
      note: resolutionComments,
    });
    setIsRejectDialogOpen(false);
  };

  const handleRejectOpen = () => {
    setIsRejectDialogOpen(true);
  }

  const handleResolutionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResolutionComments(e.currentTarget.value);
  }

  const handleNavigateCreateInspectionDetail = () => {
    push(`/inspection-schedules/create?carId=${report.carDetail.id}&reportId=${report.id}&type=gps-unassign`);
  }

  const translateStatus = (value: number) => {
    switch (value) {
      case 0: {
        return "Đang chờ";
      };
      case 1: {
        return "Đã được duyệt"
      };
      case 2: {
        return "Đã từ chối"
      };
      case 3: {
        return "Đang xử lí"
      };
      case 4: {
        return "Đã quá hạn"
      };
      case 5: {
        return "Đã kí hợp đồng"
      };
      default: {
        return "";
      }
    }
  }

  const getStatusColor = (status: number) => {
    switch (status) {
      case CarReportStatus.Pending:
        return "bg-yellow-100 text-yellow-800"
      case CarReportStatus.Rejected:
        return "bg-red-100 text-red-800"
      case CarReportStatus.Resolved:
        return "bg-green-100 text-green-800"
      case CarReportStatus.UnderReview:
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Determine report type display
  const getReportTypeDisplay = (type: number) => {
    switch (type) {
      case CarReportTypeEnum.ChangeGPS:
        return "Thay đổi GPS"
      case CarReportTypeEnum.DeactivateCar:
        return "Hủy kích hoạt xe"
      case CarReportTypeEnum.Other:
        return "Hư hỏng thân xe"
      default:
        return "Báo cáo khác"
    }
  }

  const getReportStatusDisplay = (status: number) => {
    switch (status) {
      case CarReportStatus.Pending: {
        return "Đang chờ";
      };
      case CarReportStatus.Rejected: {
        return "Đã từ chối";
      };
      case CarReportStatus.Resolved: {
        return "Đã xử lí";
      };
      case CarReportStatus.UnderReview: {
        return "Đang tiến hành";
      };
    }
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold">{report.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getStatusColor(report.status)}>{getReportStatusDisplay(report.status)}</Badge>
              <span className="text-sm text-muted-foreground">ID: {formatId(report.id)}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {/* {report.status === CarReportStatus.Pending && <Button>Xử lý báo cáo</Button>} */}
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
                  <CardDescription>Trạng thái: {translateStatus(report.inspectionScheduleDetail.status)}</CardDescription>
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
                          Id: {formatId(report.inspectionScheduleDetail.technicianId)}
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
                    report?.carDetail?.imageUrls && (
                      <Carousel>
                        <CarouselContent>
                          {
                            report?.carDetail.imageUrls.map((url, index) => (
                              <CarouselItem key={index} className="relative w-full h-56">
                                <div >
                                  <Image
                                    src={url}
                                    alt={index.toString()}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              </CarouselItem>
                            ))
                          }
                        </CarouselContent>
                      </Carousel>
                    )}
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

                {
                  report.status !== 2 && report.status !== 3 && (
                    <Separator />
                  )
                }
                {/* Action buttons based on report type */}
                <div className="flex space-x-4 mx-auto w-full">
                  {
                    (report.status === 0 || report.status === 1) && (
                      <Button onClick={handleRejectOpen} variant="destructive" className="flex-1" >
                        <XCircle className="h-4 w-4" />
                        Từ chối báo cáo
                      </Button>
                    )
                  }
                  {
                    !report.inspectionScheduleDetail && report.status === 0 && (
                      <Button onClick={handleNavigateCreateInspectionDetail} variant="default" className="flex-1">
                        <Clock2 />
                        Lên lịch thay GPS
                      </Button>
                    )
                  }
                  {
                    report.status === 1 && (
                      <Button
                        disabled={false}
                        onClick={handleApproveReportClick}
                        className="gap-2 mx-4"
                      >
                        <CheckCircle className="flex-1" />
                        Chấp nhận
                      </Button>
                    )
                  }
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
      <ApproveCarReportDialog
        id={report.id}
        isOpen={approveOpen}
        onOpenChange={() => setApproveOpen(!approveOpen)}
      />
      <RejectReportDialog
        isLoading={rejectCarReport.isLoading}
        open={isRejectDialogOpen}
        onClose={() => setIsRejectDialogOpen(false)}
        resolutionComments={resolutionComments}
        setResolutionComments={handleResolutionChange}
        handleReject={handleReject} />
    </>
  )
}

export default CarReportDetailComponent;
