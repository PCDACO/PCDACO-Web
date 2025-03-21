import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

interface ProfileHeaderProps {
  user: {
    name: string
    avatarUrl: string
    coverUrl: string
  }
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full overflow-hidden">
        {/* <Image */}
        {/*   width={32} */}
        {/*   height={32} */}
        {/*   src={user.coverUrl || "/dummy-avatar.webp"} alt="Profile cover" className="w-full h-full object-cover" /> */}
      </div>

      {/* Profile Info Overlay */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative -mt-16 md:-mt-20 flex flex-col md:flex-row md:items-end md:justify-between pb-4">
          <div className="flex items-end">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>
                <User className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline">Message</Button>
            <Button>Follow</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
