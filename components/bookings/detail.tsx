"use client"
import Image from "next/image"
import { format } from "date-fns"
import { Car, Calendar, User, CreditCard, MapPin, Star, ReceiptTextIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingResponse } from "@/constants/models/booking.model"
import { formatId } from "@/lib/format-uuid"
import BookingContractDialog from "./contract-dialog"
import { Button } from "../ui/button"
import { useDialogStore } from "@/stores/store"

// Add these type definitions at the top of the file, before the bookingData
enum FeedbackTypeEnum {
  DriverToOwner = 0,
  OwnerToDriver = 1,
}

interface Props {
  bookingData: BookingResponse
}
export default function BookingDetailComponent({
  bookingData
}: Props) {
  const { id, car, driver, owner, booking, payment, trip, feedbacks, contract } = bookingData

  const { open, setOpen } = useDialogStore();

  const handleOpenContractClick = () => {
    setOpen(true);
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "Cancelled":
        return "bg-red-500"
      case "Pending":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Chi tiết Booking</h1>
          <div>
            {contract?.terms && contract?.terms !== "" && (
              <Button onClick={handleOpenContractClick} variant="ghost">
                <ReceiptTextIcon />
              </Button>
            )}
            <Badge className={`ml-auto ${getStatusColor(booking.status)} text-white mx-4`}>{booking.status}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Booking Summary */}
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Booking ID</p>
                  <p className="font-medium">{formatId(id)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Bắt đầu</p>
                  <p className="font-medium">{formatDate(new Date(booking.startTime).toString())}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Kết thúc</p>
                  <p className="font-medium">{formatDate(new Date(booking.endTime).toString())}</p>
                </div>
                {booking.actualReturnTime && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Trả xe lúc</p>
                    <p className="font-medium">{formatDate(new Date(booking.actualReturnTime).toString())}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Địa chỉ nhận xe</p>
                  <p className="font-medium">{car.pickupAddress}</p>
                </div>
                {booking.note && (
                  <div className="space-y-1 md:col-span-3">
                    <p className="text-sm text-muted-foreground">Note</p>
                    <p className="font-medium">{booking.note}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Car Details */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Car className="mr-2 h-5 w-5" />
                Chi tiết xe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-3 gap-2">
                  {car.carImageUrl.map((url, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-md overflow-hidden">
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`${car.modelName} image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Model</p>
                    <p className="font-medium">{car.modelName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">License Plate</p>
                    <p className="font-medium">{car.licensePlate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-medium">{car.color}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Seats</p>
                    <p className="font-medium">{car.seat}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Transmission</p>
                    <p className="font-medium">{car.transmissionType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fuel Type</p>
                    <p className="font-medium">{car.fuelType}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users */}
          <Card>
            <Tabs defaultValue="driver">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Người dùng
                  </CardTitle>
                  <TabsList>
                    <TabsTrigger value="driver">Khách hàng</TabsTrigger>
                    <TabsTrigger value="owner">Người thuê</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <TabsContent value="driver" className="mt-0 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={driver.avatarUrl} alt={driver.name} />
                      <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{driver.name}</p>
                      <p className="text-sm text-muted-foreground">Khách hàng</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{driver.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">SDT</p>
                      <p className="font-medium">{driver.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">ID</p>
                      <p className="font-medium text-xs">{driver.id}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="owner" className="mt-0 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={owner.avatarUrl} alt={owner.name} />
                      <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{owner.name}</p>
                      <p className="text-sm text-muted-foreground">Chủ xe</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{owner.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">SDT</p>
                      <p className="font-medium">{owner.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">ID</p>
                      <p className="font-medium text-xs">{owner.id}</p>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>

          {/* Payment Details */}
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Chi tiết giao dịch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Trạng thái</p>
                  <Badge variant={payment.isPaid ? "default" : "destructive"}>{payment.isPaid ? "Paid" : "Unpaid"}</Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Giá cơ bản</p>
                    <p>{payment.basePrice.toLocaleString()} đ</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Phí nền tảng</p>
                    <p>{payment.platformFee.toLocaleString()} đ</p>
                  </div>
                  {payment.excessDay > 0 && (
                    <>
                      <div className="flex justify-between">
                        <p>Trả trễ</p>
                        <p>{payment.excessDay} Ngày</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Phí trả trễ</p>
                        <p>{payment.excessDayFee.toLocaleString()} đ</p>
                      </div>
                    </>
                  )}
                  {booking.isRefund && booking.refundAmount && (
                    <div className="flex justify-between text-red-500">
                      <p>Hoàn tiền</p>
                      <p>-{booking.refundAmount.toLocaleString()} đ</p>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <p>Tổng tiền</p>
                    <p>{payment.totalAmount.toLocaleString()} đ</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip Details */}
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Trip Details & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tổng hành trình</p>
                    <p className="font-medium">{trip.totalDistance} km</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Tabs defaultValue="driver-to-owner">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Phản hồi</h3>
                      <TabsList>
                        <TabsTrigger value="driver-to-owner">Từ khách</TabsTrigger>
                        <TabsTrigger value="owner-to-driver">Từ chủ xe</TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="driver-to-owner" className="mt-0">
                      {feedbacks.filter((f) => f.type === FeedbackTypeEnum.DriverToOwner).length > 0 ? (
                        feedbacks
                          .filter((f) => f.type === FeedbackTypeEnum.DriverToOwner)
                          .map((feedback) => (
                            <div key={feedback.id} className="border rounded-md p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={driver.avatarUrl} alt={feedback.userName} />
                                    <AvatarFallback>{feedback.userName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{feedback.userName}</span>
                                </div>
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm">{feedback.content}</p>
                            </div>
                          ))
                      ) : (
                        <div className="text-center py-6 text-muted-foreground border rounded-md">
                          <p>Không có phản hồi</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="owner-to-driver" className="mt-0">
                      {feedbacks.filter((f) => f.type === FeedbackTypeEnum.OwnerToDriver).length > 0 ? (
                        feedbacks
                          .filter((f) => f.type === FeedbackTypeEnum.OwnerToDriver)
                          .map((feedback) => (
                            <div key={feedback.id} className="border rounded-md p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={owner.avatarUrl} alt={feedback.userName} />
                                    <AvatarFallback>{feedback.userName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{feedback.userName}</span>
                                </div>
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm">{feedback.content}</p>
                            </div>
                          ))
                      ) : (
                        <div className="text-center py-6 text-muted-foreground border rounded-md">
                          <p>Không có phản hồi</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <BookingContractDialog terms={contract?.terms ?? ""} open={open} onOpenChange={() => setOpen(!open)} />
    </>
  )
}
