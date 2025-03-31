"use client"
import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Clock, MapPin, User, Clipboard, AlertCircle, CheckCircle, XCircle, ChevronRight, ChevronLeft, Car, Building, Tag, Palette, Cog, Fuel, Gauge, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { InspectionScheduleDetailResponse } from "@/constants/models/inspection-schedule.model"
import { useInspectionScheduleMutation } from "@/hooks/inspection-schedules/use-inspection-schedules"
import { CarResponse } from "@/constants/models/car.model"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"


interface Props {
  id: string,
  data: InspectionScheduleDetailResponse;
  car: CarResponse;
}

export default function InspectionDetailPage({ id, data, car }: Props) {
  const { rejectInspectionSchedule, updateContractFromScheduleInfo } = useInspectionScheduleMutation();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [responseNote, setResponseNote] = useState("")

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

  const handleReject = () => {
    // In a real app, this would call an API to update the inspection status
    setIsRejectDialogOpen(false)
    rejectInspectionSchedule.mutate({ id, note: responseNote });
    setResponseNote("")
  }

  const handleApprove = () => updateContractFromScheduleInfo.mutate(data.id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1))
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
              <CardTitle>Inspection Information</CardTitle>
              <CardDescription>Details about the scheduled inspection</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <Clipboard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Inspection ID</p>
                  <p className="text-sm text-muted-foreground">{data.id}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Inspection Date</p>
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
                  <p className="font-medium">Inspection Time</p>
                  <p className="text-sm text-muted-foreground">{format(data.date, "h:mm a ")}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Address</p>
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
              <CardTitle>People</CardTitle>
              <CardDescription>People involved in this inspection</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Car Owner</p>
                  <p className="text-sm text-muted-foreground">{data.owner.name}</p>
                  <p className="text-xs text-muted-foreground">Phone: {data.owner.phone}</p>
                  <p className="text-xs text-muted-foreground">ID: {data.owner.id}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Technician</p>
                  <p className="text-sm text-muted-foreground">{data.technician.name}</p>
                  <p className="text-xs text-muted-foreground">ID: {data.technician.id}</p>
                </div>
              </div>

              <Separator className="my-2" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Created on {format(data.date, "MMMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="flex w-full gap-4">
                <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="flex-1">
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reject Inspection</DialogTitle>
                      <DialogDescription>Please provide a reason for rejecting this inspection.</DialogDescription>
                    </DialogHeader>
                    <Textarea
                      placeholder="Reason for rejection..."
                      value={responseNote}
                      onChange={(e) => setResponseNote(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <DialogFooter className="mt-4">
                      <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleReject}>
                        Confirm Rejection
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button disabled={!data.hasGPSDevice} variant="default" className="flex-1" onClick={handleApprove}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  View Contract
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="mt-10 w-full">
        {/* Car Images */}
        <div className="md:col-span-2">
          <Tabs defaultValue="details" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Car Details</CardTitle>
                  <CardDescription>Basic information about this vehicle</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Model</p>
                        <p className="text-sm text-muted-foreground">{car.modelName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Manufacturer</p>
                        <p className="text-sm text-muted-foreground">{car.manufacturer.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">License Plate</p>
                        <p className="text-sm text-muted-foreground">{car.licensePlate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Color</p>
                        <p className="text-sm text-muted-foreground">{car.color}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Seats</p>
                        <p className="text-sm text-muted-foreground">{car.seat}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Owner</p>
                        <p className="text-sm text-muted-foreground">{car.ownerName}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm text-muted-foreground mt-1">{car.description}</p>
                  </div>

                  {car.location && (
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Location</p>
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
                  <CardTitle>Specifications</CardTitle>
                  <CardDescription>Technical details about this vehicle</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Cog className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Transmission</p>
                        <p className="text-sm text-muted-foreground">{car.transmissionType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Fuel Type</p>
                        <p className="text-sm text-muted-foreground">{car.fuelType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Fuel Consumption</p>
                        <p className="text-sm text-muted-foreground">{car.fuelComsumption} L/100km</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Requires Collateral</p>
                        <p className="text-sm text-muted-foreground">{car.requiresCollateral ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenities" className="mt-4">
              <Card>
                <CardHeader>
                  <CardDescription>Features and amenities included with this vehicle</CardDescription>
                </CardHeader>
                <CardContent>
                  {
                    car.amenities.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Image src={item.icon} alt={item.name} />
                          <p className="text-sm text-muted-foreground">{item.name}</p>
                        </div>
                      </div>
                    ))
                  }
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-muted">
              <Image
                src={car?.images[currentImageIndex]?.url ?? "/placeholder.svg"}
                alt={`${car.manufacturer.name} ${car.modelName}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-between p-4">
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
                    <span className="sr-only">View image {index + 1}</span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 p-2">
              {car.images.map((image, index) => (
                <Button
                  key={image.id}
                  className={`relative aspect-video overflow-hidden rounded-md ${index === currentImageIndex ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={`${car.manufacturer.name} ${car.modelName} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div >
    </div >
  )
}
