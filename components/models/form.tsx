"use client"

import { useKeywordStore } from "@/stores/store"
import type React from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useModelForm } from "@/hooks/models/use-form-model"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ManufactureResponse } from "@/constants/models/manufacture.model"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import SelectWithSearch from "../ui/select-search"
import { ModelPayLoad } from "@/constants/models/model.model"
import { LoadingSpinner } from "../ui/loading-spinner"

interface ModelsFormProps {
  id: string
  value: ModelPayLoad
  manufacturers: ManufactureResponse[]
}

interface SelectParams {
  id: string;
  value: string;
}

type KeywordType = {
  name: string
  value: string
  form: React.JSX.Element
}

const ModelForm = ({ id, value, manufacturers }: ModelsFormProps) => {
  const { keyword } = useKeywordStore()
  const { form, onSubmit, isLoading } = useModelForm({
    id,
    value,
    action: id ? "update" : keyword,
  })


  const keywords: KeywordType[] = [
    {
      name: "create",
      value: "Tạo mẫu xe",
      form: (
        <>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Name" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="manufacturerId"
            render={({ field }) => {
              const selectedCarObject = manufacturers.map((item) => {
                return {
                  id: item.id,
                  value: item.name
                }
              }).find(
                (tech) => tech.id === field.value,
              )
              const handleSelectChange = (selectedOption: SelectParams | null) => {
                field.onChange(selectedOption ? selectedOption.id : null) // Pass the ID (or null) to RHF
              }
              return (
                <FormItem>
                  <FormLabel>Nhà sản xuất</FormLabel>
                  <FormControl>
                    <SelectWithSearch<SelectParams>
                      {...field}
                      options={manufacturers.map((item) => {
                        return {
                          id: item.id,
                          value: item.name
                        }
                      })}
                      value={selectedCarObject}
                      onValueChange={handleSelectChange}
                      valueKey="id"
                      labelKey="value"
                      placeholder="Chọn nhà sản xuất"
                      searchPlaceholder="Tìm kiếm nhà sản xuất..."
                      emptyText="Không tìm thấy nhà sản xuất."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="releaseDate"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày công bố</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </>
      ),
    },
    {
      name: "update",
      value: "Cập nhật mẫu xe",
      form: (
        <>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Name" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="manufacturerId"
            render={({ field }) => {
              const selectedCarObject = manufacturers.map((item) => {
                return {
                  id: item.id,
                  value: item.name
                }
              }).find(
                (tech) => tech.id === field.value,
              )
              const handleSelectChange = (selectedOption: SelectParams | null) => {
                field.onChange(selectedOption ? selectedOption.id : null) // Pass the ID (or null) to RHF
              }
              return (
                <FormItem>
                  <FormLabel>Nhà sản xuất</FormLabel>
                  <FormControl>
                    <SelectWithSearch<SelectParams>
                      {...field}
                      options={manufacturers.map((item) => {
                        return {
                          id: item.id,
                          value: item.name
                        }
                      })}
                      value={selectedCarObject}
                      onValueChange={handleSelectChange}
                      valueKey="id"
                      labelKey="value"
                      placeholder="Chọn nhà sản xuất"
                      searchPlaceholder="Tìm kiếm nhà sản xuất..."
                      emptyText="Không tìm thấy nhà sản xuất."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="releaseDate"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày công bố</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </>
      ),
    },
    {
      name: "delete",
      value: "Xóa mẫu xe",
      form: <></>,
    },
  ]

  const GetTitle = (name: string) => {
    const selected = keywords.find((k) => k.name === name)
    return selected ? <CardTitle>{selected.value}</CardTitle> : null
  }

  const GetComponent = (name: string) => {
    const selected = keywords.find((k) => k.name === name)
    return selected ? selected.form : null
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <CardHeader>
            {GetTitle(keyword)}
            <CardDescription>{keyword === "delete" ? <p>Bạn có muốn xóa không?</p> : <></>}</CardDescription>
          </CardHeader>
          <div className="px-6 space-y-4">{GetComponent(keyword)}</div>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <LoadingSpinner /> : keyword === "delete" ? "Xóa" : "Hoàn tất"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default ModelForm
