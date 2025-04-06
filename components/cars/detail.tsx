import Image from "next/image"
import Link from "next/link"
import { CalendarClock, Car, ChevronRight, Clock, DollarSign, Star, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CarDetailsComponent() {
  // This would typically come from a database or API
  const car = {
    id: "car_123",
    name: "Toyota Camry",
    model: "Camry SE",
    manufacturer: "Toyota",
    year: 2022,
    color: "Silver",
    licensePlate: "ABC-1234",
    status: "Available",
    owner: {
      id: "owner_456",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, USA",
    },
    bookings: [
      {
        id: "booking_789",
        startDate: "2023-10-15",
        endDate: "2023-10-20",
        customerName: "Alice Johnson",
        amount: 350,
        status: "Completed",
      },
      {
        id: "booking_790",
        startDate: "2023-09-05",
        endDate: "2023-09-10",
        customerName: "Bob Williams",
        amount: 400,
        status: "Completed",
      },
      {
        id: "booking_791",
        startDate: "2023-08-22",
        endDate: "2023-08-25",
        customerName: "Carol Davis",
        amount: 250,
        status: "Completed",
      },
    ],
    statistics: {
      totalBookings: 15,
      totalEarnings: 5250,
      averageRating: 4.7,
      lastRented: "2023-10-20",
    },
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/cars" className="hover:underline">
              Cars
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Details</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{car.name}</h1>
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
                <p>{car.model}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Manufacturer</h3>
                <p>{car.manufacturer}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Year</h3>
                <p>{car.year}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Color</h3>
                <p>{car.color}</p>
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
                <span>{car.owner.name}</span>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Email</h3>
                <p>{car.owner.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Phone</h3>
                <p>{car.owner.phone}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Address</h3>
                <p>{car.owner.address}</p>
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
              <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">${car.statistics.totalEarnings}</span>
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
            <div className="grid grid-cols-5 p-4 font-medium border-b">
              <div>Booking ID</div>
              <div>Customer</div>
              <div>Dates</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            {car.bookings.map((booking) => (
              <div key={booking.id} className="grid grid-cols-5 p-4 border-b last:border-0">
                <div className="font-medium">{booking.id}</div>
                <div>{booking.customerName}</div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(booking.startDate).toLocaleDateString()} -{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div>${booking.amount}</div>
                <div>
                  <Badge variant="outline">{booking.status}</Badge>
                </div>
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
                <div className="aspect-video rounded-md overflow-hidden border">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Car front view"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-video rounded-md overflow-hidden border">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Car side view"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-video rounded-md overflow-hidden border">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Car rear view"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-video rounded-md overflow-hidden border">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Car interior"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="paperwork" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="aspect-[3/4] rounded-md overflow-hidden border">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Registration document"
                    width={600}
                    height={800}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-[3/4] rounded-md overflow-hidden border">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Insurance document"
                    width={600}
                    height={800}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-[3/4] rounded-md overflow-hidden border">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Maintenance record"
                    width={600}
                    height={800}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}


