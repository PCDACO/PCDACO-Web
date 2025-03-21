"usm client"
import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  label: string
  photoType: string
  file: File | null
  onChange: (file: File | null) => void
}

export function ImageUploader({ label, photoType, file, onChange }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update preview when file prop changes
  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }, [file])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null

    if (selectedFile) {
      onChange(selectedFile)
      // Preview will be updated by the useEffect
    } else {
      onChange(null)
    }
  }

  const handleRemove = () => {
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <div className="font-medium">{label}</div>
      <Card className={cn("border-2 border-dashed", preview ? "border-muted" : "border-muted-foreground/25")}>
        <CardContent className="p-0">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`file-${photoType}`}
          />

          {preview ? (
            <div className="relative">
              <Image
                src={preview || "/placeholder.svg"}
                alt={label}
                width={800}
                height={400}
                className="w-full h-[200px] object-cover rounded-md"
              />
              <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={handleRemove}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center p-6 h-[200px] cursor-pointer"
              onClick={handleClick}
            >
              <Camera className="h-10 w-10 mb-2 text-muted-foreground" />
              <div className="text-sm text-muted-foreground text-center">
                Click to upload a photo or drag and drop
                <p className="text-xs mt-1">PNG, JPG or WEBP (max. 10MB)</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}

