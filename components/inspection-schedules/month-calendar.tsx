"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Schedule {
    id: number
    technicianId: string
    date: string
    time: string
    client: string
    location: string
}

interface MonthCalendarProps {
    currentDate: Date
    onDateChange: (date: Date) => void
    schedules: Schedule[]
}

export function MonthCalendar({ currentDate, onDateChange, schedules }: MonthCalendarProps) {
    const [calendarDays, setCalendarDays] = useState<Array<{ date: Date | null; isCurrentMonth: boolean }>>([])

    // Get days for the calendar grid
    useEffect(() => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()

        // First day of the month
        const firstDayOfMonth = new Date(year, month, 1)
        // Last day of the month
        const lastDayOfMonth = new Date(year, month + 1, 0)

        // Day of the week for the first day (0 = Sunday, 6 = Saturday)
        const firstDayOfWeek = firstDayOfMonth.getDay()

        const daysInMonth = lastDayOfMonth.getDate()

        // Create array for all days to display
        const days: Array<{ date: Date | null; isCurrentMonth: boolean }> = []

        // Add days from previous month
        for (let i = 0; i < firstDayOfWeek; i++) {
            const prevMonthDate = new Date(year, month, -firstDayOfWeek + i + 1)
            days.push({ date: prevMonthDate, isCurrentMonth: false })
        }

        // Add days from current month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ date: new Date(year, month, i), isCurrentMonth: true })
        }

        // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
        const remainingDays = 42 - days.length
        for (let i = 1; i <= remainingDays; i++) {
            const nextMonthDate = new Date(year, month + 1, i)
            days.push({ date: nextMonthDate, isCurrentMonth: false })
        }

        setCalendarDays(days)
    }, [currentDate])


    return (
        <TooltipProvider>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
                    </h2>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                const newDate = new Date(currentDate)
                                newDate.setMonth(newDate.getMonth() - 1)
                                onDateChange(newDate)
                            }}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                const newDate = new Date(currentDate)
                                newDate.setMonth(newDate.getMonth() + 1)
                                onDateChange(newDate)
                            }}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-center font-medium py-2 border-b border-gray-200">
                            {day}
                        </div>
                    ))}

                    {calendarDays.map((day, index) => {
                        if (!day.date) return <div key={index} className="h-24 border border-gray-100"></div>

                        const daySchedules = schedules.filter((schedule) => schedule.date === day.date?.toISOString().split("T")[0])
                        const today = new Date()
                        const isToday =
                            day.date.getDate() === today.getDate() &&
                            day.date.getMonth() === today.getMonth() &&
                            day.date.getFullYear() === today.getFullYear()

                        return (
                            <div
                                key={index}
                                className={`h-24 p-1 border ${day.isCurrentMonth ? "bg-white" : "bg-gray-50"} 
                  ${isToday ? "ring-2 ring-black" : ""} 
                  ${!day.isCurrentMonth ? "text-gray-400" : ""}`}
                            >
                                <div className="text-right mb-1">{day.date.getDate()}</div>
                                <div className="overflow-y-auto max-h-16 space-y-1">
                                    {daySchedules.length > 0 ? (
                                        daySchedules.length <= 3 ? (
                                            daySchedules.map((schedule) => (
                                                <Tooltip key={schedule.id}>
                                                    <TooltipTrigger asChild>
                                                        <Badge className="w-full justify-start truncate bg-black hover:bg-gray-800 cursor-pointer text-xs">
                                                            {schedule.time} - {schedule.client}
                                                        </Badge>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <div className="text-sm">
                                                            <p>
                                                                <strong>Client:</strong> {schedule.client}
                                                            </p>
                                                            <p>
                                                                <strong>Time:</strong> {schedule.time}
                                                            </p>
                                                            <p>
                                                                <strong>Location:</strong> {schedule.location}
                                                            </p>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ))
                                        ) : (
                                            <>
                                                {daySchedules.slice(0, 2).map((schedule) => (
                                                    <Tooltip key={schedule.id}>
                                                        <TooltipTrigger asChild>
                                                            <Badge className="w-full justify-start truncate bg-black hover:bg-gray-800 cursor-pointer text-xs">
                                                                {schedule.time} - {schedule.client}
                                                            </Badge>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <div className="text-sm">
                                                                <p>
                                                                    <strong>Client:</strong> {schedule.client}
                                                                </p>
                                                                <p>
                                                                    <strong>Time:</strong> {schedule.time}
                                                                </p>
                                                                <p>
                                                                    <strong>Location:</strong> {schedule.location}
                                                                </p>
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                ))}
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Badge className="w-full justify-center bg-gray-800 hover:bg-black cursor-pointer text-xs">
                                                            +{daySchedules.length - 2} more
                                                        </Badge>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <div className="text-sm space-y-2">
                                                            {daySchedules.slice(2).map((schedule) => (
                                                                <div key={schedule.id} className="border-b pb-1 last:border-0 last:pb-0">
                                                                    <p>
                                                                        <strong>
                                                                            {schedule.time} - {schedule.client}
                                                                        </strong>
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground">{schedule.location}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </>
                                        )
                                    ) : null}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </TooltipProvider>
    )
}





