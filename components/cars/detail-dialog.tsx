import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { CarDetail } from "@/constants/models/technician-task.model"
interface CarDetailsDialogProps {
  car: CarDetail
  isOpen: boolean
  onClose: () => void
  onOpenGpsAssignment: () => void
}

export default function CarDetailsDialog({ car, isOpen, onClose, onOpenGpsAssignment }: CarDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{car.modelName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh] pr-4">
          <div className="space-y-8">
            {/* Owner Information */}
            <section className="flex items-center space-x-4">
              <Image
                src={car.owner.avatarUrl || "/placeholder.svg"}
                alt={car.owner.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg">Owner</h3>
                <p>{car.owner.name}</p>
              </div>
            </section>

            {/* Car Details */}
            <section>
              <h3 className="font-semibold text-lg mb-2">Car Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="License Plate" value={car.licensePlate} />
                <DetailItem label="Color" value={car.color} />
                <DetailItem label="Seats" value={car.seat.toString()} />
                <DetailItem label="Transmission" value={car.transmissionType} />
                <DetailItem label="Fuel Type" value={car.fuelType} />
                <DetailItem label="Fuel Consumption" value={`${car.fuelConsumption} L/100km`} />
                <DetailItem label="Requires Collateral" value={car.requiresCollateral ? "Yes" : "No"} />
                <DetailItem label="Price" value={`${car.price} Đồng`} />
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p>{car.description}</p>
            </section>

            {/* Car Images */}

            {car.images.length !== 0 && (<section>
              <h3 className="font-semibold text-lg mb-2">Car Images</h3>
              <ImageGallery images={car.images.map(i => i.url)} />
            </section>)}
            {/* Paperwork Images */}
            {
              car.images.length !== 0 && (<section>
                <h3 className="font-semibold text-lg mb-2">Paperwork</h3>
                <ImageGallery images={car.images.map(i => i.url)} />
              </section>)
            }
            {/* Amenities
            <section>
              <h3 className="font-semibold text-lg mb-2">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Air Conditioning" value={car.amen.hasAC ? "Yes" : "No"} />
                <DetailItem label="Bluetooth" value={car.amenities.hasBluetooth ? "Yes" : "No"} />
                <DetailItem label="Navigation" value={car.amenities.hasNavigation ? "Yes" : "No"} />
              </div>
            </section> */}

            {/* Location */}
            <section>
              <h3 className="font-semibold text-lg mb-2">Location</h3>
              <p>{car.inspectionAddress}</p>
            </section>

            {/* GPS Assignment Button */}
            <section className="pt-4">
              <Button onClick={onOpenGpsAssignment} className="w-full bg-black text-white hover:bg-gray-800">
                Assign GPS Device
              </Button>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-semibold">{label}:</span> {value}
    </div>
  )
}

function ImageGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-square">
          <Image
            src={image || "/placeholder.svg"}
            alt={`Image ${index + 1}`}
            fill
            className="object-cover rounded-md"
          />
        </div>
      ))}
    </div>
  )
}

