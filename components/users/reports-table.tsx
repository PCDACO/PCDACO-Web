"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Flag, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserReportDetail } from "@/constants/models/user.model"

export function ReportsTable({
  reportsMade,
  reportsReceived,
}: {
  reportsMade: UserReportDetail[]
  reportsReceived: UserReportDetail[]
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolved
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Pending
          </Badge>
        )
      case "Under Review":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Under Review
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Tabs defaultValue="made" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md mb-4">
        <TabsTrigger value="made">Reports Made</TabsTrigger>
        <TabsTrigger value="received">Reports Received</TabsTrigger>
      </TabsList>

      <TabsContent value="made">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Booking</TableHead>
                {/* <TableHead>Reported User</TableHead> */}
                <TableHead>Nội dung</TableHead>
                {/* <TableHead>Date</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportsMade.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Flag className="h-10 w-10 text-muted-foreground/60" />
                      <p>No reports made by this user</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                reportsMade.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.bookingId}</TableCell>
                    <TableCell>{report.reporterName}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate" >
                        {report.title}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(report.resolvedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View report details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="received">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Booking</TableHead>
                {/* <TableHead>Reporting User</TableHead> */}
                <TableHead>Nội dung</TableHead>
                {/* <TableHead>Date</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportsReceived.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Flag className="h-10 w-10 text-muted-foreground/60" />
                      <p>No reports received for this user</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                reportsReceived.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.bookingId}</TableCell>
                    {/* <TableCell>{report.reportingUser}</TableCell> */}
                    <TableCell>
                      <div className="max-w-[200px] truncate">
                        {report.title}
                      </div>
                    </TableCell>
                    {/* <TableCell>{new Date(report.at).toLocaleDateString()}</TableCell> */}
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View report details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  )
}
