"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Car, Eye } from "lucide-react"
import { UserCarDetail } from "@/constants/models/user.model"
import { useRouter } from "next/navigation"

export function CarsTable({ cars }: { cars: UserCarDetail[] }) {
  const { push } = useRouter();
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Available
          </Badge>
        )
      case "Rented":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Rented
          </Badge>
        )
      case "Maintenance":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Maintenance
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleActionClick = (id: string) => {
    push(`/cars/${id}`);
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Xe</TableHead>
            <TableHead>Biển số xe</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Giá</TableHead>
            <TableHead className="text-right">Số ghế</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <Car className="h-10 w-10 text-muted-foreground/60" />
                  <p>No cars found for this user</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="font-medium">{car.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {car.manufacturerName} - {car.modelName}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{car.licensePlate}</TableCell>
                <TableCell>{getStatusBadge(car.status)}</TableCell>
                <TableCell className="text-right">${car.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{car.seat}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => handleActionClick(car.id)} variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View car details</span>
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


