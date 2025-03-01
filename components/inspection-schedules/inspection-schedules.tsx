"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MonthCalendar } from "@/components/inspection-schedules/month-calendar"
import { CreateInspectionForm } from "@/components/inspection-schedules/create-inspection"

// Sample data for technicians
const technicians = [
    { id: "tech1", name: "John Smith" },
    { id: "tech2", name: "Sarah Johnson" },
    { id: "tech3", name: "Michael Brown" },
    { id: "tech4", name: "Emily Davis" },
]

// Sample data for schedules
const sampleSchedules = [
    { id: 1, technicianId: "tech1", date: "2025-03-05", time: "09:00", client: "ABC Corp", location: "123 Main St" },
    { id: 2, technicianId: "tech1", date: "2025-03-05", time: "14:00", client: "XYZ Inc", location: "456 Oak Ave" },
    {
        id: 3,
        technicianId: "tech1",
        date: "2025-03-05",
        time: "16:30",
        client: "Global Systems",
        location: "789 Pine Rd",
    },
    {
        id: 4,
        technicianId: "tech1",
        date: "2025-03-12",
        time: "14:00",
        client: "Tech Solutions",
        location: "456 Oak Ave",
    },
    { id: 5, technicianId: "tech2", date: "2025-03-07", time: "10:30", client: "Acme Co", location: "789 Pine Rd" },
    { id: 6, technicianId: "tech2", date: "2025-03-07", time: "13:00", client: "Global Ltd", location: "321 Elm St" },
    { id: 7, technicianId: "tech2", date: "2025-03-15", time: "13:00", client: "Innovate Inc", location: "321 Elm St" },
    {
        id: 8,
        technicianId: "tech3",
        date: "2025-03-10",
        time: "11:00",
        client: "Tech Solutions",
        location: "654 Maple Dr",
    },
    { id: 9, technicianId: "tech3", date: "2025-03-10", time: "15:30", client: "Innovate Inc", location: "987 Cedar Ln" },
    {
        id: 10,
        technicianId: "tech4",
        date: "2025-06-20",
        time: "09:30",
        client: "First Client",
        location: "123 First St",
    },
    {
        id: 11,
        technicianId: "tech4",
        date: "2025-03-20",
        time: "12:00",
        client: "Second Client",
        location: "456 Second Ave",
    },
    {
        id: 12,
        technicianId: "tech4",
        date: "2025-03-20",
        time: "15:30",
        client: "Third Client",
        location: "789 Third Rd",
    },
    {
        id: 13,
        technicianId: "tech4",
        date: "2025-03-20",
        time: "17:00",
        client: "Fourth Client",
        location: "321 Fourth Blvd",
    },
]

export default function TechnicianCalendarPage() {
    const [selectedTechnician, setSelectedTechnician] = useState<string | null>(null)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [filteredSchedules, setFilteredSchedules] = useState(sampleSchedules)

    // Filter schedules when technician selection changes
    useEffect(() => {
        if (selectedTechnician) {
            setFilteredSchedules(sampleSchedules.filter((schedule) => schedule.technicianId === selectedTechnician))
        } else {
            setFilteredSchedules(sampleSchedules)
        }
    }, [selectedTechnician])

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Select onValueChange={setSelectedTechnician}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select technician" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Technicians</SelectItem>
                                    {technicians.map((tech) => (
                                        <SelectItem key={tech.id} value={tech.id}>
                                            {tech.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-black text-white hover:bg-gray-800">
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Inspection
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Schedule New Inspection</DialogTitle>
                                </DialogHeader>
                                <CreateInspectionForm technicians={technicians} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Card className="border-black">
                    <CardContent className="p-0">
                        <MonthCalendar currentDate={currentDate} onDateChange={setCurrentDate} schedules={filteredSchedules} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}