"use client"
import { ChangeEvent, useCallback, useState } from "react"
import { format } from "date-fns"
import { Calendar, Clock, MapPin, User, Clipboard, AlertCircle, ChevronRight, ChevronLeft, Car, Building, Tag, Palette, Cog, Fuel, Gauge, CheckCircle, XCircle, PlusCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { InspectionScheduleDetailResponse } from "@/constants/models/inspection-schedule.model"
import { CarResponse } from "@/constants/models/car.model"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useInspectionScheduleMutation } from "@/hooks/inspection-schedules/use-inspection-schedules"
import { Label } from "../ui/label"
import { InspectionScheduleStatusStrings } from "@/constants/enums/inspection-schedules.enum"
import { useRouter } from "next/navigation"
import { InspectionPhotoKey } from "@/constants/enums/inspection-photo-type.enum"
import RejectInspectionDialog from "./reject-inspection-dialog"
import ApproveChangeGPSInspectionDialog from "./approve-changegps-inspection-dialog"
import ApproveIncidentInspectionDialog from "./approve-incident-inspection-dialog"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"

interface Props {
  id: string,
  data: InspectionScheduleDetailResponse;
  car: CarResponse;
  role: string;
}

export type Preview = {
  file: File;
  url: string;
};

export default function InspectionDetailComponent({ id, data, car, role }: Props) {
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approveIncidentOpen, setApproveIncidentOpen] = useState(false);
  const [approveChangeGPSOpen, setApproveChangeGPSOpen] = useState(false);
  const [note, setNote] = useState("");
  const [rejectNote, setRejectNote] = useState("");
  const { approveInspectionScheduleNoPhotos, rejectInspectionSchedule, approveInspectionScheduleIncident, updateContractFromScheduleInfo } = useInspectionScheduleMutation();
  const [previews, setPreviews] = useState<Preview[]>([]);
  const { push } = useRouter();

  const handleApprove = () => updateContractFromScheduleInfo.mutate(data.id);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const files = e.currentTarget.files;
      if (!files) return;
      const newPreviews: Preview[] = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setPreviews((prev) => [...prev, ...newPreviews]);
    },
    []
  );

  const handleRemove = useCallback(
    (index: number) => {
      setPreviews((prev) => {
        const toRevoke = prev[index].url;
        URL.revokeObjectURL(toRevoke);

        return prev.filter((_, i) => i !== index);
      });
    },
    []
  );

  const handleNavigateToApprove = () => {
    push("/technician-todo/approve");
  }

  const isInProgressOrSigned = () => {
    const status = data.status;
    return (
      status === InspectionScheduleStatusStrings.InProgress ||
      status === InspectionScheduleStatusStrings.Signed
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Đang chờ
          </Badge>
        )
      case "Approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Đã hoàn thành
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Đã từ chối
          </Badge>
        )
      case "InProgress":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Đang xử lí
          </Badge>
        )
      case "Expired":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Đang xử lí
          </Badge>
        )
      case "Signed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Đang xử lí
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (status: string) => {
    switch (status) {
      case "NewCar":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Xác minh
          </Badge>
        );
      case "Incident":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Sự cố
          </Badge>
        );
      case "ChangeGPS":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Đổi GPS
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const inspectionKeyBadgeConfig: Record<InspectionPhotoKey, { label: string; colorClass: string }> = {
    ExteriorCar: {
      label: "Ngoại thất",
      colorClass: "bg-blue-400",
    },
    FuelGauge: {
      label: "Kim xăng",
      colorClass: "bg-yellow-400",
    },
    ParkingLocation: {
      label: "Vị trí đậu",
      colorClass: "bg-purple-400",
    },
    CarKey: {
      label: "Chìa khóa xe",
      colorClass: "bg-indigo-400",
    },
    TrunkSpace: {
      label: "Cốp xe",
      colorClass: "bg-orange-400",
    },
    FuelGaugeFinal: {
      label: "Kim xăng",
      colorClass: "bg-amber-600",
    },
    Scratches: {
      label: "Trầy",
      colorClass: "bg-red-400",
    },
    Cleanliness: {
      label: "Độ sạch sẽ",
      colorClass: "bg-green-400",
    },
    TollFees: {
      label: "Phí xa lộ",
      colorClass: "bg-amber-400",
    },
    VehicleInspectionCertificate: {
      label: "Giấy tờ đăng kiểm",
      colorClass: "bg-teal-400",
    },
    Other: {
      label: "Khác",
      colorClass: "bg-gray-400",
    },
  };

  const mapBadgeComponent = (value: InspectionPhotoKey): JSX.Element => {
    const { label, colorClass } = inspectionKeyBadgeConfig[value] ?? inspectionKeyBadgeConfig["Other"];
    return (
      <Badge
        className={`${colorClass} text-white px-2 py-1 rounded-md`}
      >
        {label}
      </Badge>
    );
  }
  const [currentInspectionImageIndex, setCurrentInspectionImageIndex] = useState(0)

  const nextInspectionImage = () => {
    setCurrentInspectionImageIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1))
  }

  const prevInspectionImage = () => {
    setCurrentInspectionImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1))
  }

  const handleRejectNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRejectNote(e.currentTarget.value);
  }

  const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNote(e.currentTarget.value);
  }

  const handleRejectNoteSubmit = () => {
    rejectInspectionSchedule.mutate({
      id: id,
      note: rejectNote,
    })
  }

  const handleApproveNoteSubmit = () => {
    approveInspectionScheduleNoPhotos.mutate({
      id: id,
      note: note,
    })
  }

  const handleRejectDialogOpen = () => {
    setRejectOpen(true);
  }

  const handleApproveIncidentDialogOpen = () => {
    setApproveIncidentOpen(true);
  }

  const handleApproveChangeGPSDialogOpen = () => {
    setApproveChangeGPSOpen(true);
  }

  const previewsToFileList = (previews: Preview[]): FileList => {
    const dt = new DataTransfer();
    previews.forEach((p) => dt.items.add(p.file));
    return dt.files;
  }

  const handleApproveIncidentSubmit = () => {
    approveInspectionScheduleIncident.mutate({
      id, note, images: previewsToFileList(previews)
    });
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-end">
      </div>
      <div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin xác minh</CardTitle>
              <CardDescription>Các chi tiết về lịch xác minh</CardDescription>
              <span className="text-muted-foreground my-1">Loại: {getTypeBadge(data.type)}</span>
              <span className="text-muted-foreground my-1">Trạng thái: {getStatusBadge(data.status)}</span>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <Clipboard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">ID</p>
                  <p className="text-sm text-muted-foreground">{data.id}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Ngày xác minh</p>
                  <p className="text-sm text-muted-foreground">
                    {format(data.date, "MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Thời gian</p>
                  <p className="text-sm text-muted-foreground">{format(data.date, "h:mm a ")}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Địa chỉ</p>
                  <p className="text-sm text-muted-foreground">{data.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Notes</p>
                  <p className="text-sm text-muted-foreground">{data.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Người tham gia</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Owner Detail */}
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Chủ xe</p>
                  <p className="text-sm text-muted-foreground">{data.owner.name}</p>
                  <p className="text-xs text-muted-foreground">Phone: {data.owner.phone}</p>
                  <p className="text-xs text-muted-foreground">ID: {data.owner.id}</p>
                </div>
              </div>

              {/* Technician Detail */}
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Kĩ thuật viên</p>
                  <p className="text-sm text-muted-foreground">{data.technician.name}</p>
                  <p className="text-xs text-muted-foreground">ID: {data.technician.id}</p>
                </div>
              </div>

              <Separator className="my-2" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Tạo lúc: {format(data.createdAt, "MMMM d, yyyy 'at' h:mm a")}
                </p>
              </div>

              {
                role === "Technician" && (
                  <div className="flex justify-end gap-x-4">
                    {/* Reject Dialog */}
                    {
                      (data.status === "InProgress" || data.status === "Signed") && (
                        <Button onClick={handleRejectDialogOpen} variant="destructive" className="flex-1">
                          <XCircle className="mr-2 h-4 w-4" />
                        </Button>
                      )
                    }
                    {/* Approve Dialog */}
                    {
                      (data.type === "ChangeGPS" && data.status == "InProgress") && (
                        <Button className="flex-1" onClick={handleApproveChangeGPSDialogOpen}>
                          <CheckCircle /> Hoàn thành
                        </Button>
                      )
                    }
                    {
                      (data.type === "Incident" && data.status == "InProgress") && (
                        <Button className="flex-1" onClick={handleApproveIncidentDialogOpen}>
                          <CheckCircle /> Hoàn thành
                        </Button>
                      )
                    }
                    {
                      ((isInProgressOrSigned() || data.type === "NewCar") && data?.status !== "Pending") && (
                        <div className="flex">
                          {
                            !data?.isTechnicianSigned && (
                              <Button disabled={(!data.hasGPSDevice)} variant="default" className="flex-1" onClick={handleApprove}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Xem hợp đồng
                              </Button>
                            )
                          }
                          {
                            data?.isTechnicianSigned && data?.type === "NewCar" && data?.status !== "Approved" && data?.status !== "Rejected" && data?.status !== "Pending" && (
                              <Button variant="default" className="flex-1" onClick={handleNavigateToApprove}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Xác minh
                              </Button>
                            )
                          }
                        </div>
                      )
                    }
                  </div>
                )
              }
            </CardContent>
          </Card>
        </div>
        <div className="mt-10 w-full grid grid-cols-2 space-x-4">
          {/* Car Images */}
          <div className="md:col-span-1">
            <Tabs defaultValue="details" className="mt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Chi tiết</TabsTrigger>
                <TabsTrigger value="specifications">Thông số</TabsTrigger>
                <TabsTrigger value="amenities">Tiện nghi</TabsTrigger>
                <TabsTrigger value="images">Hình ảnh</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4 min-h-[480px]">
                <Card>
                  <CardHeader>
                    <CardTitle>Car Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Mã xe</p>
                          <p className="text-sm text-muted-foreground">{car.modelName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Nhà sản xuất</p>
                          <p className="text-sm text-muted-foreground">{car.manufacturer.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Biển số</p>
                          <p className="text-sm text-muted-foreground">{car.licensePlate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Màu</p>
                          <p className="text-sm text-muted-foreground">{car.color}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Số ghế</p>
                          <p className="text-sm text-muted-foreground">{car.seat}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Chủ xe</p>
                          <p className="text-sm text-muted-foreground">{car.ownerName}</p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium">Mô tả</p>
                      <p className="text-sm text-muted-foreground mt-1">{car.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông số</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Cog className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Hộp số</p>
                          <p className="text-sm text-muted-foreground">{car.transmissionType}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Kiểu nhiên liệu</p>
                          <p className="text-sm text-muted-foreground">{car.fuelType}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Mức tiêu thụ</p>
                          <p className="text-sm text-muted-foreground">{car.fuelComsumption} L/100km</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tiện nghi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-y-4">
                      {
                        car?.amenities?.map((item) => (
                          <div key={item.id} className="flex flex-row">
                            <Image width={16} height={16} src={item.icon} alt={item.name} />
                            <p className="ml-4 text-sm text-muted-foreground">{item.name}</p>
                          </div>
                        )) ?? []
                      }
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* image of the cars */}
              <TabsContent value="images" className="mt-4 ">
                <Card>
                  <CardHeader>
                    <CardTitle>Hình ảnh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Carousel>
                      <CarouselContent>
                        {
                          car?.images.map((item, index) => (
                            <CarouselItem key={index} className="relative w-full h-96" >
                              <div >
                                <Image
                                  alt={item.id}
                                  src={item.url}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </CarouselItem>
                          ))
                        }
                      </CarouselContent>
                    </Carousel>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          {/* Inspection Schedule */}
          {
            !!data.photos && data.photos.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle> Lịch kiểm tra </CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-8 h-96" >
                  <Label className="font-semibold">
                    {mapBadgeComponent(data.photos[currentInspectionImageIndex].type as InspectionPhotoKey)}
                  </Label>
                  <Image
                    src={data.photos[currentInspectionImageIndex].url ?? "/placeholder.png"}
                    alt={`${car.manufacturer.name} ${car.modelName}`}
                    fill
                    className="object-contain"
                  />
                  <div className="flex items-center justify-between mx-4 h-full">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={prevInspectionImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={nextInspectionImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                    {data.photos.map((_, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className={`h-2 w-2 rounded-full p-0 ${index === currentInspectionImageIndex ? "bg-primary" : "bg-background/80"}`}
                        onClick={() => setCurrentInspectionImageIndex(index)}
                      >
                        <span className="sr-only">
                          <PlusCircleIcon />
                          Xem thêm {index + 1}</span>
                      </Button>
                    ))}
                  </div>
                  <CardFooter>
                  </CardFooter>
                </CardContent>
              </Card>
            )
          }
        </div >
      </div >

      <RejectInspectionDialog
        open={rejectOpen}
        onClose={() => setRejectOpen(!rejectOpen)}
        rejectNote={rejectNote}
        handleRejectNoteChange={handleRejectNoteChange}
        handleRejectNoteSubmit={handleRejectNoteSubmit}
      />

      <ApproveIncidentInspectionDialog
        open={approveIncidentOpen}
        onClose={() => setApproveIncidentOpen(!approveIncidentOpen)}
        note={note}
        handleNoteChange={handleNoteChange}
        previews={previews}
        handleFileChange={handleFileChange}
        handleRemove={handleRemove}
        handleApproveIncidentSubmit={handleApproveIncidentSubmit}
        isLoading={approveInspectionScheduleIncident.isLoading} />
      <ApproveChangeGPSInspectionDialog
        open={approveChangeGPSOpen}
        onClose={() => setApproveChangeGPSOpen(!approveChangeGPSOpen)}
        note={note}
        handleNoteChange={handleNoteChange}
        handleApproveNoteSubmit={handleApproveNoteSubmit}
        isLoading={approveInspectionScheduleNoPhotos.isLoading}
      />
    </>
  )
}
