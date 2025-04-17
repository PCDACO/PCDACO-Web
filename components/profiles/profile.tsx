"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  Pencil,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Coins,
  CalendarIcon,
} from "lucide-react"
import { CurrentUserResponse } from "@/constants/models/user.model"
import { formatCurrency } from "@/lib/formatCurrency"
import { useUpdateUserForm } from "@/hooks/users/use-form-user"
import { Calendar } from "../ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { formatDate } from "@/lib/utils"


interface Props {
  user: CurrentUserResponse;
}

export default function ProfileComponent({ user }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const { form, onSubmit, isLoading } = useUpdateUserForm({
    id: user.id,
    value: {
      name: user.name,
      address: user.address,
      dateOfBirth: new Date(user.dateOfBirth),
      email: user.email,
      phone: user.phone
    }
  });

  // Toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
    }
    setIsEditing(!isEditing)
  }


  return (
    <div className="w-full h-screen ">
      {/* <ProfileHeader user={user} /> */}
      <main className="w-full mx-auto py-6 px-4 md:px-6 h-screen">
        <div className="flex flex-col lg:flex-row gap-6">
          <Tabs defaultValue="profile" className="w-full min-h-[600px]">
            <TabsContent value="profile" id="profile">
              <Card className="shadow-lg">
                <CardHeader className="relative">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback> {Array.from(user.name)[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{user.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Coins className="h-4 w-4" />
                        {formatCurrency(user.balance)}
                      </CardDescription>
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
                        <Button variant="default" size="sm" onClick={onSubmit} disabled={isLoading}>
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
                          <div className="text-sm font-medium text-muted-foreground">SDT</div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Địa chỉ</div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{user.address}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Ngày sinh</div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{formatDate(user.dateOfBirth.toString())}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Tên người dùng</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                </FormItem>
                              )
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="email"
                                    />
                                  </FormControl>
                                </FormItem>
                              )
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>SDT</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                </FormItem>
                              )
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Địa chỉ</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                </FormItem>
                              )
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel></FormLabel>
                                  <FormControl>
                                    <Calendar
                                      {...field}
                                      mode="single"
                                      selected={form.getValues().dateOfBirth}
                                      onSelect={(e) => {
                                        form.setValue("dateOfBirth", e ?? new Date())
                                      }}
                                      className="rounded-md border shadow"
                                    />
                                  </FormControl>
                                </FormItem>
                              )
                            }}
                          />
                        </div>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main >
    </div >
  )
}

