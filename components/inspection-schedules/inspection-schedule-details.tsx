"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Clock, MapPin, User, Clipboard, AlertCircle, CheckCircle, XCircle } from "lucide-react"

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
import { useRouter } from "next/navigation"
import { InspectionScheduleDetailResponse } from "@/constants/models/inspection-schedule.model"
import { useInspectionScheduleForm } from "@/hooks/inspection-schedules/use-form-inspection-schedule"
import { useInspectionScheduleMutation } from "@/hooks/inspection-schedules/use-inspection-schedules"


interface Props {
  id: string,
  data: InspectionScheduleDetailResponse
}

export default function InspectionDetailPage({ id, data }: Props) {
  const { replace } = useRouter();
  const { rejectInspectionSchedule } = useInspectionScheduleMutation();
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
            Approved
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
    console.log("Inspection rejected with note:", responseNote)
    setIsRejectDialogOpen(false)
    rejectInspectionSchedule.mutate({ id, note: responseNote });
    setResponseNote("")
  }

  const handleApprove = () => {
    replace(`/technician-todo/${id}/approve`);
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inspection Details</h1>
        <div className="flex items-center gap-2">{getStatusBadge("Pending")}</div>
      </div>

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
              <Button variant="default" className="flex-1" onClick={handleApprove}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

