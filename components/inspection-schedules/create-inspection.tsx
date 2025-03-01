"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"


export function CreateInspectionForm() {
  const [date, setDate] = useState<Date>()
  const [technicianId, setTechnicianId] = useState("")
  const [time, setTime] = useState("")
  const [client, setClient] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically save the new inspection to your backend
    const newInspection = {
      technicianId,
      date: date ? format(date, "yyyy-MM-dd") : "",
      time,
      client,
      location,
    }

    console.log("New inspection:", newInspection)

    // Reset form
    setDate(undefined)
    setTechnicianId("")
    setTime("")
    setClient("")
    setLocation("")

    // Close dialog (would need to be handled by parent component)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="text-sm text-muted-foreground mb-2">
        Note: Technicians can have multiple inspections scheduled on the same day.
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="technician">Technician</Label>
          <Select value={technicianId} onValueChange={setTechnicianId} required>
            <SelectTrigger id="technician">
              <SelectValue placeholder="Select technician" />
            </SelectTrigger>
            <SelectContent>
              {/* {technicians.map((tech) => (
                <SelectItem key={tech.id} value={tech.id}>
                  {tech.name}
                </SelectItem>
              ))} */}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Address</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-black text-white hover:bg-gray-800">
          Schedule Inspection
        </Button>
      </div>
    </form>
  )
}



