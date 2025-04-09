"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye } from "lucide-react"
import { UserBookingDetail } from "@/constants/models/user.model"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/formatCurrency"

export function BookingsTable({ bookings }: { bookings: UserBookingDetail[] }) {
  const { push } = useRouter();
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "Upcoming":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Upcoming
          </Badge>
        )
      case "Active":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Active
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleActionClick = (id: string) => {
    push(`/bookings/${id}`);
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Xe</TableHead>
            <TableHead>Ngày</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Tổng tiền</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <Clock className="h-10 w-10 text-muted-foreground/60" />
                  <p>No bookings found for this user</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>
                  {booking.carModelName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(booking.startTime).toLocaleDateString()} -{" "}
                      {new Date(booking.endTime).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="text-right">{formatCurrency(booking.totalAmount)}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => handleActionClick(booking.id)} variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View booking details</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}


