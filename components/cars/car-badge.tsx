import { CarStatusString } from "@/constants/enums/car-status.enum";
import { Badge } from "../ui/badge";
import { translate } from "@/lib/translate";
import { cn } from "@/lib/utils";

interface CarBadgeProps {
  status: string;
}

export const CarBadge = ({ status }: CarBadgeProps) => {
  let bgColor = "";
  let textColor = "";
  let text = "";

  switch (status) {
    case CarStatusString.Available:
      bgColor = "bg-green-500";
      textColor = "text-white";
      text = translate.car.status.Available;
      break;
    case CarStatusString.Rented:
      bgColor = "bg-blue-500";
      textColor = "text-white";
      text = translate.car.status.Rented;
      break;
    case CarStatusString.Pending:
      bgColor = "bg-yellow-500";
      textColor = "text-white";
      text = translate.car.status.Pending;
      break;
    case CarStatusString.Inactive:
      bgColor = "bg-red-500";
      textColor = "text-white";
      text = translate.car.status.Inactive;
      break;
    case CarStatusString.Maintain:
      bgColor = "bg-purple-500";
      textColor = "text-white";
      text = translate.car.status.Maintain;
      break;
    case CarStatusString.Rejected:
      bgColor = "bg-red-500";
      textColor = "text-white";
      text = translate.car.status.Rejected;
      break;
    default:
      bgColor = "bg-gray-500";
      textColor = "text-white";
      text = translate.car.status.Pending;
      break;
  }

  return (
    <Badge variant="outline" className={cn(bgColor, textColor)}>
      <p className="text-sm font-medium">{text}</p>
    </Badge>
  );
};
