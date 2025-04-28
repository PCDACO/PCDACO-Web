"use client"
import { ChangeEvent, useCallback, useState } from "react"
import { format } from "date-fns"
import { Calendar, Clock, MapPin, User, Clipboard, AlertCircle, ChevronRight, ChevronLeft, Car, Building, Tag, Palette, Cog, Fuel, Gauge, X, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { InspectionScheduleDetailResponse } from "@/constants/models/inspection-schedule.model"
import { CarResponse } from "@/constants/models/car.model"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { useInspectionScheduleMutation } from "@/hooks/inspection-schedules/use-inspection-schedules"
import { Label } from "../ui/label"

interface Props {
  id: string,
  data: InspectionScheduleDetailResponse;
  car: CarResponse;
}

export default function InspectionDetailComponent({ id, data, car }: Props) {
  const [note, setNote] = useState("");
  const [rejectNote, setRejectNote] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const { approveInspectionScheduleNoPhotos, rejectInspectionSchedule, approveInspectionScheduleIncident } = useInspectionScheduleMutation();
  const [localUrl, setLocalUrl] = useState("");
  const handleFileChange = useCallback((files: FileList | null) => {
    if (files) {
      const objectUrl = URL.createObjectURL(files[0]);
      setLocalUrl(objectUrl);
    } else {
      setLocalUrl("");
    }
  }, []);
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending
          </Badge>
        )
      case "Approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            View Contract
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1))
  }

  const handleRejectNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRejectNote(e.currentTarget.value);
  }

  const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNote(e.currentTarget.value);
  }

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImages(e.currentTarget.files);
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

  const handleApproveIncidentSubmit = () => {
    approveInspectionScheduleIncident.mutate({ id, note, images });
  }


  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inspection Details</h1>
        <div className="flex items-center gap-2">{getStatusBadge("Pending")}</div>
      </div>
      <div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin xác minh</CardTitle>
              <CardDescription>Các chi tiết về lịch xác minh</CardDescription>
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

              <div className="flex justify-end gap-x-4">
                {/* Reject Dialog */}
                {
                  ((data.type === "ChangeGPS" || data.type === "Incident") && data.status == "Pending") && (
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="destructive">
                          <X />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <Label>Nhập lí do</Label>
                        <Input value={rejectNote} onChange={handleRejectNoteChange} />
                        <DialogFooter>
                          <Button onClick={handleRejectNoteSubmit}> Hoàn tất </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )
                }
                {/* Approve Dialog */}
                {
                  (data.type === "ChangeGPS" && data.status == "Pending") && (
                    <Dialog>
                      <DialogTrigger>
                        <Button>
                          <CheckIcon /> Hoàn thành
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <Label>Nhập lí do</Label>
                        <Input value={note} onChange={handleNoteChange} />
                        <DialogFooter>
                          <Button onClick={handleApproveNoteSubmit}> Hoàn tất </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )
                }
                {
                  (data.type === "Incident" && data.status == "Pending") && (
                    <Dialog>
                      <DialogTrigger>
                        <Button>
                          <CheckIcon /> Hoàn thành
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <Label>Nhập lí do</Label>
                        <Input value={note} onChange={handleNoteChange} />
                        <Label>Nhập ảnh</Label>
                        <Input type="file" accept="file/*" onChange={handleImagesChange} />
                        {localUrl !== "" && (
                          <Image src={localUrl}
                            alt="Preview"
                            width={320}
                            height={240}
                            objectFit="contain"
                            layout="responsive" />
                        )}
                        <DialogFooter>
                          <Button onClick={handleApproveIncidentSubmit}> Hoàn tất </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-10 w-full">
        {/* Car Images */}
        <div className="md:col-span-2">
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

                  {car.location && (
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Vị trí</p>
                      </div>
                      {
                        car.location &&
                        <p className="text-sm text-muted-foreground mt-1">
                          Latitude: {car.location.latitude}, Longitude: {car.location.longtitude}
                        </p>
                      }
                    </div>
                  )}
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
            <TabsContent value="images" className="mt-4 ">
              <Card className="min-h-[500px]">
                <CardHeader>
                  <CardTitle>Hình ảnh</CardTitle>
                </CardHeader>
                <CardContent className="relative h-96">
                  <Image
                    src={car?.images[currentImageIndex]?.url ?? "/placeholder.svg"}
                    alt={`${car.manufacturer.name} ${car.modelName}`}
                    fill
                    className="object-contain "
                  />
                  <div className="flex items-center justify-between mx-4 h-full">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                    {car.images.map((_, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className={`h-2 w-2 rounded-full p-0 ${index === currentImageIndex ? "bg-primary" : "bg-background/80"}`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <span className="sr-only">Xem thêm {index + 1}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div >
    </div >
  )
}
