"use client";
import Image from "next/image";
import { Car, Clock, Eye, MapPin, ReceiptText, Star, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { CarDetailResponse } from "@/constants/models/car.model";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatId } from "@/lib/format-uuid";
import { CarBadge } from "./car-badge";
import { CarStatusString } from "@/constants/enums/car-status.enum";
import { useDialogStore } from "@/stores/store";
import CarContractDialog from "./contract-dialog";

interface Props {
  car: CarDetailResponse;
  role: string;
}

export default function CarDetailsComponent({ car, role }: Props) {
  const { color, manufacturer, modelName, owner, images, bookings, location } = car;
  const { push } = useRouter();
  const { open, setOpen } = useDialogStore();

  const handleNavigateContract = () => push(`/cars/${car.id}/contract-details`);

  const handleActionClick = (id: string) => {
    push(`/bookings/${id}`);
  };

  return (
    <>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 w-full">
            <div className="flex justify-between items-center w-full">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {modelName}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <CarBadge status={car.status} />
                  <span className="text-muted-foreground">
                    Biển số xe: {car.licensePlate}
                  </span>
                </div>
              </div>
              <div>
                {
                  !!location && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        push(`/cars/${car.id}/map`);
                      }}
                    >
                      <MapPin />
                    </Button>
                  )
                }
                {car?.contract?.terms && car?.contract?.terms !== "" && (
                  <Button
                    onClick={handleNavigateContract}
                    variant="outline"
                    className="mx-2"
                  >
                    <ReceiptText />
                  </Button>
                )}
                {car.status === CarStatusString.Pending &&
                  role === "Consultant" && (
                    <Button
                      disabled={car.hasInspectionSchedule}
                      className="mx-4"
                      onClick={() => {
                        push(
                          `/inspection-schedules/create?carId=${car.id}&type=Edit`
                        );
                      }}
                    >
                      Tạo lịch kiểm định
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Thông tin xe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-muted-foreground">Mẫu xe</h3>
                  <p>{modelName}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">
                    Nhà sản xuất
                  </h3>
                  <p>{manufacturer.name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Dòng xe</h3>
                  <p>{modelName}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Màu</h3>
                  <p>{color}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chủ xe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{owner.name}</span>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Email</h3>
                  <p>{owner.email}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">SDT</h3>
                  <p>{owner.phone}</p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Địa chỉ</h3>
                  <p>{owner.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tổng chuyến</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Car className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-2xl font-bold">
                  {car.statistics.totalBookings}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Lợi nhuận xe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                {/* <DollarSign className="h-5 w-5 text-muted-foreground mr-2" /> */}
                <span className="text-2xl font-bold">
                  {formatCurrency(car.statistics.totalEarnings)}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Đánh giá trung bình</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-amber-500 mr-2 fill-amber-500" />
                <span className="text-2xl font-bold">
                  {car.statistics.averageRating}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Chuyến</CardTitle>
            <CardDescription>Các lượt thuê gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-6 p-4 font-medium border-b">
                <div>Booking ID</div>
                <div>Khách</div>
                <div>Ngày</div>
                <div>Số tiền</div>
                <div>Trạng thái</div>
                <div>Action</div>
              </div>
              {bookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className="grid grid-cols-6 p-4 border-b last:border-0"
                >
                  <div className="font-medium">
                    {formatId(booking.bookingId)}
                  </div>
                  <div>{booking.driverName}</div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(booking.startTime).toLocaleDateString()} -{" "}
                      {new Date(booking.endTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div>{formatCurrency(booking.amount)}</div>
                  <div>
                    <Badge variant="outline">{booking.status}</Badge>
                  </div>
                  <Button
                    onClick={() => handleActionClick(booking.bookingId)}
                    variant="ghost"
                    size="icon"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Chi tiết xe</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ảnh</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="car">
              <TabsList className="mb-4">
                <TabsTrigger value="car">Xe</TabsTrigger>
                <TabsTrigger value="paperwork">Giấy tờ</TabsTrigger>
              </TabsList>
              <TabsContent value="car" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images
                    .filter((item) => item.type === "Car")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="aspect-video rounded-md overflow-hidden border"
                      >
                        <Image
                          key={item.id}
                          src={
                            item.url !== ""
                              ? item.url ?? "/placeholder.png"
                              : "/placeholder.png"
                          }
                          alt="Car front view"
                          width={600}
                          height={400}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="paperwork" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images
                    .filter((item) => item.type === "Paper")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="aspect-video rounded-md overflow-hidden border"
                      // onClick={() => handleImageClick(item.url)}
                      >
                        <Image
                          key={item.id}
                          src={
                            item.url !== ""
                              ? item.url ?? "/placeholder.png"
                              : "/placeholder.png"
                          }
                          alt="Car front view"
                          width={600}
                          height={400}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <CarContractDialog
        terms={car?.contract?.terms ?? ""}
        open={open}
        onOpenChange={() => setOpen(!open)}
      />
    </>
  );
}
