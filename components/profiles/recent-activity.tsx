import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, MessageSquare, ThumbsUp } from "lucide-react"

export default function RecentActivity() {
  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "post",
      title: "Created a new design system",
      date: "2 days ago",
      icon: <BookOpen className="h-4 w-4" />,
      description: "Published a comprehensive design system for web applications with accessibility in mind.",
    },
    {
      id: 2,
      type: "comment",
      title: "Commented on 'UX Research Methods'",
      date: "5 days ago",
      icon: <MessageSquare className="h-4 w-4" />,
      description: "Great article! I've been using these methods in my recent projects with excellent results.",
    },
    {
      id: 3,
      type: "like",
      title: "Liked 'Designing for Accessibility'",
      date: "1 week ago",
      icon: <ThumbsUp className="h-4 w-4" />,
      description: "",
    },
    {
      id: 4,
      type: "post",
      title: "Shared a case study",
      date: "2 weeks ago",
      icon: <BookOpen className="h-4 w-4" />,
      description: "My latest case study on redesigning a financial app for better user engagement and conversion.",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and contributions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id}>
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">{activity.icon}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{activity.title}</h4>
                    <span className="text-xs text-muted-foreground">{activity.date}</span>
                  </div>
                  {activity.description && <p className="text-sm text-muted-foreground">{activity.description}</p>}
                </div>
              </div>
              {index < activities.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

