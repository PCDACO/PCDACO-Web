import { Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "./separator";

interface Props {
  name: string;
  avatar: string,
  content: string;
  time: string,
}

export default function CustomActivityItem({ name, avatar, content, time }: Props) {
  return (
    <div className="flex flex-col space-y-2 ">
      <div className="flex items-center gap-4 ">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} alt={""} />
          <AvatarFallback> {Array.from(name)[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <p className="text-sm">
            <span className="font-medium">{content}</span>
          </p>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {time}
          </div>
        </div>
      </div>
      <Separator />
    </div>
  )
}
