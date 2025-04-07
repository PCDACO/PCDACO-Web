"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Car, ChevronLeft, ChevronRight, Clock, Flag, MapPin, Phone, User } from "lucide-react"
import { ReportsTable } from "./reports-table"
import { CarsTable } from "./cars-table"
import { BookingsTable } from "./bookings-table"
import { UserDetailResponse } from "@/constants/models/user.model"
import { formatDate } from "@/lib/utils"
import { formatCurrency } from "@/lib/formatCurrency"
import { formatId } from "@/lib/format-uuid"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
  user: UserDetailResponse;
}
export default function UserDetailsComponent({ user }: Props) {

  const { id, balance, bookings, cars, dateOfBirth, phone, reports, role } = user;
  const [url, setUrl] = useState("");
  const { back } = useRouter();
  const mapUrl = () => {
    switch (role) {
      case "Admin": {
        return "#";
      };
      case "Owner": {
        return "/owners";
      };
      case "Driver": {
        return "/drivers";
      };
      case "Technician": {
        return "/technicians";
      };
      case "Consultant": {
        return "/consultants";
      };
      default: {
        return "#";
      }
    }
  }

  useEffect(() => {
    setUrl(() => mapUrl());
    //eslint-disable-next-line
  }, [])

  const handleClick = () => {
    back();
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Button onClick={handleClick} variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Link href={`${url}`} className="hover:underline">
            Người dùng
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>Details</span>
        </div>
        <div className="flex gap-2">
          <Button variant={user.isBanned ? "default" : "destructive"}>
            {user.isBanned ? "Unban User" : "Ban User"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="text-base">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  ID: {formatId(id)}
                </span>
                <span className="flex items-center gap-1">Role: {role}</span>
              </CardDescription>
            </div>
            <div className="ml-auto">
              <Badge variant={user.isBanned ? "destructive" : "outline"} className="text-sm">
                {user.isBanned ? "Banned" : "Not Banned"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Phone</div>
                <div className="font-medium flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {phone}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Address</div>
                <div className="font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {user.address}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Date of Birth</div>
                <div className="font-medium flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(dateOfBirth)}
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Balance</div>
                <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Cars Owned</span>
                </div>
                <Badge variant="secondary">{cars.length}</Badge>
              </div>
              <Separator />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Total Bookings</span>
                </div>
                <Badge variant="secondary">{user.bookings.length}</Badge>
              </div>
              <Separator />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Reports Made</span>
                </div>
                <Badge variant="secondary">{reports?.filter(item => item.reportedById === id)?.length ?? 0}</Badge>
              </div>
              <Separator />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Reports Received</span>
                </div>
                <Badge variant="secondary">{reports?.filter(item => item.reportedById !== id)?.length ?? 0}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Cars, Bookings, and Reports */}
      <Tabs defaultValue="cars" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="cars">Cars</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="cars">
          <Card>
            <CardHeader>
              <CardTitle>Cars Owned</CardTitle>
              <CardDescription>List of cars owned by this user</CardDescription>
            </CardHeader>
            <CardContent>
              <CarsTable cars={cars} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
              <CardDescription>All bookings made by this user</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingsTable bookings={bookings} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Reports made by and received by this user</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportsTable reportsMade={reports.filter(item => item.reportedById === id)} reportsReceived={reports.filter(item => item.reportedById !== id)} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

