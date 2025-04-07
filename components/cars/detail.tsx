"use client"
import Image from "next/image"
import Link from "next/link"
import { CalendarClock, Car, ChevronLeft, ChevronRight, Clock, Eye, Star, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { CarDetailResponse } from "@/constants/models/car.model"
import { formatCurrency } from "@/lib/formatCurrency"
import { formatId } from "@/lib/format-uuid"

interface Props {
  car: CarDetailResponse;
}

export default function CarDetailsComponent({
  car
}: Props) {
  const { color,
    manufacturer,
    modelName,
    owner,
    images,
    bookings } = car;
  const { back, push } = useRouter();
  // This would typically come from a database or API
  const handleClick = () => {
    back();
  }

  const handleActionClick = (id: string) => {
    push(`/bookings/${id}`);
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <Button onClick={handleClick} variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Link href="/cars" className="hover:underline">
              Cars
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Details</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{modelName}</h1>
          <div className="flex items-center gap-2">
            <Badge variant={car.status === "Available" ? "default" : "destructive"}>{car.status}</Badge>
            <span className="text-muted-foreground">License: {car.licensePlate}</span>
          </div>
        </div>
        <div className="flex gap-2">
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Car Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-muted-foreground">Model</h3>
                <p>{modelName}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Manufacturer</h3>
                <p>{manufacturer.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Color</h3>
                <p>{color}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Owner Details</CardTitle>
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
                <h3 className="font-medium text-muted-foreground">Phone</h3>
                <p>{owner.phone}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Address</h3>
                <p>{owner.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Car className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{car.statistics.totalBookings}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Car Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {/* <DollarSign className="h-5 w-5 text-muted-foreground mr-2" /> */}
              <span className="text-2xl font-bold">{formatCurrency(car.statistics.totalEarnings)}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-500 mr-2 fill-amber-500" />
              <span className="text-2xl font-bold">{car.statistics.averageRating}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Last Rented</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CalendarClock className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{new Date(car.statistics.lastRented).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <CardDescription>Recent bookings for this vehicle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 p-4 font-medium border-b">
              <div>Booking ID</div>
              <div>Customer</div>
              <div>Dates</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            {bookings.map((booking) => (
              <div key={booking.bookingId} className="grid grid-cols-6 p-4 border-b last:border-0">
                <div className="font-medium">{formatId(booking.bookingId)}</div>
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
                <Button onClick={() => handleActionClick(booking.bookingId)} variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View car details</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="car">
            <TabsList className="mb-4">
              <TabsTrigger value="car">Car Photos</TabsTrigger>
              <TabsTrigger value="paperwork">Paperwork</TabsTrigger>
            </TabsList>
            <TabsContent value="car" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                  images.filter(item => item.type === "Car").map(item => (
                    <div key={item.id} className="aspect-video rounded-md overflow-hidden border">
                      <Image
                        key={item.id}
                        src={item.url !== "" ? item.url ?? "/placeholder.png" : "/placeholder.png"}
                        alt="Car front view"
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))
                }
              </div>
            </TabsContent>
            <TabsContent value="paperwork" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                  images.filter(item => item.type === "Paper").map(item => (
                    <div key={item.id} className="aspect-video rounded-md overflow-hidden border">
                      <Image
                        key={item.id}
                        src={item.url !== "" ? item.url ?? "/placeholder.png" : "/placeholder.png"}
                        alt="Car front view"
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}


