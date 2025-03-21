import { Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  avatar: string,
  name: string,
  action: string,
  target: string,
  time: string,
}

export default function ActivityItem({ avatar, name, action, target, time }: Props) {
  return (
    <div className="flex items-center gap-4 hover:pointer">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm">
          <span className="font-medium">{name}</span> {action} <span className="font-medium">{target}</span>
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          {time}
        </div>
      </div>
    </div>
  )
}
