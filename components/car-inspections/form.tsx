"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/ui/image-uploader"
import { toast } from "@/hooks/use-toast"
import { useInspectionScheduleMutation } from "@/hooks/inspection-schedules/use-inspection-schedules"
import { InspectionPhotoType } from "@/constants/enums/inspection-photo-type.enum"
import { InProgressInspectionScheduleResponse } from "@/constants/models/inspection-schedule.model"


// Helper to get human-readable labels
const getPhotoTypeLabel = (type: InspectionPhotoType): string => {
  const labels: Record<string, string> = {
    [InspectionPhotoType.ExteriorCar.toString()]: "Photo of the car exterior",
    [InspectionPhotoType.FuelGauge.toString()]: "Photo of the fuel gauge",
    [InspectionPhotoType.ParkingLocation.toString()]: "Photo of the parking location",
    [InspectionPhotoType.CarKey.toString()]: "Photo of the car key",
    [InspectionPhotoType.TrunkSpace.toString()]: "Photo of the trunk space",
    [InspectionPhotoType.Scratches.toString()]: "Photo of scratches",
    [InspectionPhotoType.Cleanliness.toString()]: "Photo of the car cleanliness",
  }
  return labels[type]
}

// All photo types in a single array
const ALL_PHOTOS = [
  InspectionPhotoType.ExteriorCar,
  InspectionPhotoType.FuelGauge,
  InspectionPhotoType.ParkingLocation,
  InspectionPhotoType.CarKey,
  InspectionPhotoType.TrunkSpace,
  InspectionPhotoType.Scratches,
  InspectionPhotoType.Cleanliness,
  InspectionPhotoType.VehicleInspectionCertificate,
]
interface Props {
  schedule: InProgressInspectionScheduleResponse;
}

export default function CarInspectionForm({ schedule }: Props) {
  const { approveInspectionSchedule } = useInspectionScheduleMutation();
  const [photos, setPhotos] = useState<Record<string, File | null>>({
    [InspectionPhotoType.ExteriorCar.toString()]: null,
    [InspectionPhotoType.FuelGauge.toString()]: null,
    [InspectionPhotoType.ParkingLocation.toString()]: null,
    [InspectionPhotoType.CarKey.toString()]: null,
    [InspectionPhotoType.TrunkSpace.toString()]: null,
    [InspectionPhotoType.Scratches.toString()]: null,
    [InspectionPhotoType.Cleanliness.toString()]: null,
    [InspectionPhotoType.VehicleInspectionCertificate.toString()]: null,
  })

  const [dates, setDates] = useState<Record<string, Date | undefined>>({
    [InspectionPhotoType.ExteriorCar.toString()]: undefined,
    [InspectionPhotoType.FuelGauge.toString()]: undefined,
    [InspectionPhotoType.ParkingLocation.toString()]: undefined,
    [InspectionPhotoType.CarKey.toString()]: undefined,
    [InspectionPhotoType.TrunkSpace.toString()]: undefined,
    [InspectionPhotoType.Scratches.toString()]: undefined,
    [InspectionPhotoType.Cleanliness.toString()]: undefined,
    [InspectionPhotoType.VehicleInspectionCertificate.toString()]: undefined,
  })
  const [descriptions, setDescriptions] = useState<Record<string, string>>({
    [InspectionPhotoType.ExteriorCar.toString()]: "",
    [InspectionPhotoType.FuelGauge.toString()]: "",
    [InspectionPhotoType.ParkingLocation.toString()]: "",
    [InspectionPhotoType.CarKey.toString()]: "",
    [InspectionPhotoType.TrunkSpace.toString()]: "",
    [InspectionPhotoType.Scratches.toString()]: "",
    [InspectionPhotoType.Cleanliness.toString()]: "",
    [InspectionPhotoType.VehicleInspectionCertificate.toString()]: "",
  })
  const [note, setNote] = useState<string>("");

  const isDatesValid = () => {
    // eslint-disable-next-line
    Object.entries(dates).forEach(([_, date]) => {
      if (date === undefined) {
        return false;
      }
      return true;
    });
  };

  const isPhotosValid = () => {
    // eslint-disable-next-line 
    Object.entries(photos).forEach(([_, photo]) => {
      if (photo === null) {
        return false;
      }
      return true;
    });
  };


  const handleFileChange = (type: InspectionPhotoType, file: File | null) => {
    setPhotos((prev) => ({
      ...prev,
      [type]: file,
    }))
  }

  const handleDateChange = (type: InspectionPhotoType, date: Date | undefined) => {
    setDates((prev) => ({
      ...prev,
      [type]: date,
    }))
  }

  const handleDescriptionChange = (type: InspectionPhotoType, description: string) => {
    setDescriptions((prev) => ({
      ...prev,
      [type]: description,
    }))
  }

  const handleNoteChange = (note: string) => setNote(note);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    console.log("SUBMITTED");

    // Check if at least one photo is uploaded
    // eslint-disable-next-line
    const uploadedPhotos = Object.entries(photos).filter(([_, file]) => file !== null)

    if (uploadedPhotos.length === 0) {
      console.log("NOPHOTO");
      toast({
        title: "No photos uploaded",
        description: "Please upload at least one inspection photo.",
        variant: "destructive",
      })
      return;
    }
    if (!isPhotosValid) {
      console.log("THIEU PHOTO");
      toast({
        title: "Not enough photos",
        description: "Please upload all inspection photos.",
        variant: "destructive",
      })
      return;
    }
    if (!isDatesValid) {
      console.log("THIEU DATE")
      toast({
        title: "Not enough dates",
        description: "Please upload all dates.",
        variant: "destructive",
      })
      return;
    }
    approveInspectionSchedule.mutate({
      id: schedule.id,
      payload: {
        dates: dates,
        photos: photos,
        descriptions: descriptions,
        note: note,
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Car Inspection Photos</CardTitle>
          <CardDescription>Upload only the photos you need and select dates for each uploaded photo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {ALL_PHOTOS.map((type) => (
            <ImageUploader
              key={type}
              label={getPhotoTypeLabel(type)}
              photoType={type}
              file={photos[type]}
              date={dates[type]}
              description={descriptions[type]}
              onChange={(file) => handleFileChange(type, file)}
              onDateChange={(date) => handleDateChange(type, date)}
              onDescriptionChange={(description) => handleDescriptionChange(type, description)} />
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
        <Button disabled={schedule?.contractDetail?.ownerSignatureDate === undefined} type="submit" size="lg">
          Submit Inspection
        </Button>
      </div>
    </form>
  )
}
