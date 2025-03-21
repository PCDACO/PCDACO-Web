"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import {
  Pencil,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  LinkIcon,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react"

// Define the user type
interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  location: string
  bio: string
  occupation: string
  joinDate: string
  avatarUrl: string
  coverUrl: string
  skills: string[]
  socialLinks: {
    website?: string
    github?: string
    twitter?: string
    linkedin?: string
  }
}


export default function ProfileComponent() {
  // Mock user data - in a real app, this would come from an API or database
  const [user, setUser] = useState<UserProfile>({
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Product designer with 5+ years of experience in creating user-centered digital products. Passionate about solving complex problems with simple, elegant solutions. I specialize in UX/UI design for web and mobile applications, with a focus on accessibility and inclusive design practices.",
    occupation: "Senior Product Designer",
    joinDate: "January 2021",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    coverUrl: "/placeholder.svg?height=300&width=1200",
    skills: ["UI Design", "UX Research", "Prototyping", "Figma", "User Testing", "Accessibility"],
    socialLinks: {
      website: "https://sarahjohnson.design",
      github: "sarahjohnson",
      twitter: "sarahj_design",
      linkedin: "sarahjohnsondesign",
    },
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UserProfile>(user)
  const [isLoading, setIsLoading] = useState(false)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle social link changes
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }))
  }

  // Toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
      // If we're exiting edit mode without saving, reset form data
      setFormData(user)
    }
    setIsEditing(!isEditing)
  }

  // Save profile changes
  const saveProfile = async () => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call here
      // await updateUserProfile(formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the user state with the new data
      setUser(formData)
      setIsEditing(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full bg-muted/40">
      {/* <ProfileHeader user={user} /> */}
      <main className="w-full mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsContent value="profile" id="profile">
              <Card>
                <CardHeader className="relative">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{user.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Briefcase className="h-4 w-4" />
                        {user.occupation}
                      </CardDescription>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>Member since {user.joinDate}</span>
                      </div>
                    </div>
                    {!isEditing ? (
                      <Button variant="outline" size="sm" className="absolute top-4 right-4" onClick={toggleEdit}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="outline" size="sm" onClick={toggleEdit}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button variant="default" size="sm" onClick={saveProfile} disabled={isLoading}>
                          {isLoading ? (
                            <span>Saving...</span>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  {!isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Email</div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Phone</div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Location</div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{user.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Bio</div>
                        <p className="text-sm">{user.bio}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Social Links</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {user.socialLinks.website && (
                            <div className="flex items-center gap-2 text-sm">
                              <LinkIcon className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={user.socialLinks.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {user.socialLinks.website}
                              </a>
                            </div>
                          )}
                          {user.socialLinks.github && (
                            <div className="flex items-center gap-2 text-sm">
                              <Github className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`https://github.com/${user.socialLinks.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {user.socialLinks.github}
                              </a>
                            </div>
                          )}
                          {user.socialLinks.twitter && (
                            <div className="flex items-center gap-2 text-sm">
                              <Twitter className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`https://twitter.com/${user.socialLinks.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {user.socialLinks.twitter}
                              </a>
                            </div>
                          )}
                          {user.socialLinks.linkedin && (
                            <div className="flex items-center gap-2 text-sm">
                              <Linkedin className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`https://linkedin.com/in/${user.socialLinks.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {user.socialLinks.linkedin}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="occupation">Occupation</Label>
                          <Input
                            id="occupation"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                      </div>
                      <div className="space-y-4">
                        <Label>Social Links</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="website" className="flex items-center gap-2">
                              <LinkIcon className="h-4 w-4" />
                              Website
                            </Label>
                            <Input
                              id="website"
                              name="website"
                              value={formData.socialLinks.website || ""}
                              onChange={handleSocialChange}
                              placeholder="https://yourwebsite.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="github" className="flex items-center gap-2">
                              <Github className="h-4 w-4" />
                              GitHub
                            </Label>
                            <Input
                              id="github"
                              name="github"
                              value={formData.socialLinks.github || ""}
                              onChange={handleSocialChange}
                              placeholder="username"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="twitter" className="flex items-center gap-2">
                              <Twitter className="h-4 w-4" />
                              Twitter
                            </Label>
                            <Input
                              id="twitter"
                              name="twitter"
                              value={formData.socialLinks.twitter || ""}
                              onChange={handleSocialChange}
                              placeholder="username"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="linkedin" className="flex items-center gap-2">
                              <Linkedin className="h-4 w-4" />
                              LinkedIn
                            </Label>
                            <Input
                              id="linkedin"
                              name="linkedin"
                              value={formData.socialLinks.linkedin || ""}
                              onChange={handleSocialChange}
                              placeholder="username"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          {/* </div> */}
        </div>
      </main>
    </div>
  )
}

