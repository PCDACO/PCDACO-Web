"use client"
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/ui/image-uploader"
import { toast } from "@/hooks/use-toast"
import { useInspectionScheduleMutation } from "@/hooks/inspection-schedules/use-inspection-schedules"

// Helper to get human-readable labels
const getPhotoTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    "ExteriorCar": "Photo of the car exterior",
    "FuelGauge": "Photo of the fuel gauge",
    "ParkingLocation": "Photo of the parking location",
    "CarKey": "Photo of the car key",
    "TrunkSpace": "Photo of the trunk space",
    "FuelGaugeFinal": "Photo of the final fuel gauge",
    "Scratches": "Photo of scratches",
    "Cleanliness": "Photo of the car cleanliness",
    "TollFees": "Photo of toll fees",
  }
  return labels[type]
}

// All photo types in a single array
const ALL_PHOTOS = [
  "ExteriorCar",
  "FuelGauge",
  "ParkingLocation",
  "CarKey",
  "TrunkSpace",
  "FuelGaugeFinal",
  "Scratches",
  "Cleanliness",
  "TollFees",
]

interface Props {
  id: string,
}

export default function CarInspectionForm({
  id
}: Props) {
  const [photos, setPhotos] = useState<Record<string, File | null>>({
    "ExteriorCar": null,
    "FuelGauge": null,
    "ParkingLocation": null,
    "CarKey": null,
    "TrunkSpace": null,
    "FuelGaugeFinal": null,
    "Scratches": null,
    "Cleanliness": null,
    "TollFees": null,
  })
  const { approveInspectionSchedule } = useInspectionScheduleMutation();
  const [note, setNote] = useState<string>();

  const handleFileChange = (type: string, file: File | null) => {
    setPhotos((prev) => ({
      ...prev,
      [type]: file,
    }))
  }
  const handleNoteChange = (note: string) => setNote(note);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // validate
    const missingPhotos = Object.entries(photos)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, file]) => file === null)
      .map(([type]) => type)
    if (missingPhotos.length > 0) {
      toast({
        title: "Missing photos",
        description: `Please upload all required inspection photos.`,
        variant: "destructive",
      })
      return
    }
    // approve API
    approveInspectionSchedule.mutate({
      id: id,
      payload: {
        note: note ?? "",
        photos: photos
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Car Inspection Photos</CardTitle>
          <CardDescription>Upload photos for car inspection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {ALL_PHOTOS.map((type) => (
            <ImageUploader
              key={type}
              label={getPhotoTypeLabel(type)}
              photoType={type}
              file={photos[type]}
              onChange={(file) => handleFileChange(type, file)}
            />
          ))}
        </CardContent>
      </Card>

      <textarea
        className="w-full p-2 border rounded-md min-h-[80px] text-sm"
        placeholder="Add notes about this photo (optional)"
        value={note}
        onChange={(e) => handleNoteChange(e.target.value)}
      />
      <div className="mt-6 flex justify-end">
        <Button type="submit" size="lg">
          Submit
        </Button>
      </div>
    </form>
  )
}

