import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, User, Car } from "lucide-react"
import { useRouter } from "next/navigation"

interface InspectionTaskItemProps {
  id: string,
  address: string
  ownerName: string
  licensePlate: string
  scheduledTime: string
}

export default function InspectionTaskItem({
  id,
  address,
  ownerName,
  licensePlate,
  scheduledTime,
}: InspectionTaskItemProps) {
  const { push } = useRouter();
  const handleBtnClick = () => push(`/technician-todo/${id}`)

  return (
    <Card onClick={handleBtnClick} className="border-l-4 border-l-yellow-400 hover:cursor-pointer hover:shadow-lg hover:animate-pulse">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
            <p className="text-sm">{address}</p>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm font-medium">{ownerName}</p>
          </div>

          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm font-medium">{licensePlate}</p>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{scheduledTime}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

