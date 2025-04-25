"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useInspectionScheduleForm } from "@/hooks/inspection-schedules/use-form-inspection-schedule";
import { LoadingSpinner } from "../ui/loading-spinner";
import { InspectionSchedulePayload } from "@/constants/models/inspection-schedule.model";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Card, CardContent, CardHeader } from "../ui/card";
import { CarResponse } from "@/constants/models/car.model";
import { TechnicianResponse } from "@/constants/models/technician.model";
import SelectWithSearch from "../ui/select-search";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface SelectParams {
  id: string;
  value: string;
}

interface InspectionScheduleFormProps {
  id: string;
  carId?: string;
  reportId?: string;
  type?: string;
  value: InspectionSchedulePayload;
  cars: CarResponse[];
  technicians: TechnicianResponse[];
}
export default function CreateInspectionForm({
  id,
  carId,
  reportId,
  type,
  value,
  cars,
  technicians,
}: InspectionScheduleFormProps) {
  const { form, isLoading, onSubmit } = useInspectionScheduleForm({
    id,
    value,
    keyword: "create",
  });

  const isTimeDisabled = (hour: number, minute: number) => {
    const totalMinutes = hour * 60 + minute;
    return totalMinutes >= 1320 || totalMinutes <= 419; // 22:00 to 06:59
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="w-full text-center">Tạo Lịch</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <div>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => {
                    return (
                      <FormItem className="mb-4">
                        <FormLabel>Loại</FormLabel>
                        <FormControl>
                          <Select disabled={!type}
                            value={field.value.toString()}
                            onValueChange={(value) => form.setValue("type", parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn loại kiểm tra" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem className="hover:cursor-pointer" value="0">Xác minh xe mới</SelectItem>
                                <SelectItem className="hover:cursor-pointer" value="1">Sự cố</SelectItem>
                                <SelectItem className="hover:cursor-pointer" value="2">Gỡ GPS</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="technicianId"
                  render={({ field }) => {
                    const selectedTechnicianObject = technicians
                      .map((technician) => {
                        return {
                          id: technician.id,
                          value: technician.name,
                        };
                      })
                      .find(
                        (tech) => tech.id === field.value // field.value holds the ID string
                      );

                    const handleSelectChange = (
                      selectedOption: SelectParams | null
                    ) => {
                      field.onChange(selectedOption ? selectedOption.id : null); // Pass the ID (or null) to RHF
                    };
                    return (
                      <FormItem>
                        <FormLabel>Kĩ Thuật Viên</FormLabel>
                        <FormControl>
                          <SelectWithSearch<SelectParams> // Specify the data type
                            options={technicians.map((technician) => {
                              return {
                                id: technician.id,
                                value: technician.name,
                              };
                            })}
                            value={selectedTechnicianObject}
                            onValueChange={handleSelectChange}
                            valueKey="id"
                            labelKey="value"
                            placeholder="Chọn Kĩ Thuật Viên"
                            searchPlaceholder="Tìm kiếm KTV..."
                            emptyText="Không tìm thấy KTV."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="carId"
              render={({ field }) => {
                const selectedCarObject = cars
                  .map((car) => {
                    return {
                      id: car.id,
                      value: car.licensePlate,
                    };
                  })
                  .find((car) => car.id === field.value);
                const handleSelectChange = (
                  selectedOption: SelectParams | null
                ) => {
                  field.onChange(selectedOption ? selectedOption.id : null); // Pass the ID (or null) to RHF
                };
                return (
                  <FormItem>
                    <FormLabel>Xe</FormLabel>
                    <FormControl>
                      <SelectWithSearch<SelectParams>
                        options={cars.map((car) => {
                          return {
                            id: car.id,
                            value: `${car.modelName} - ${car.licensePlate}`,
                          };
                        })}
                        value={selectedCarObject}
                        onValueChange={handleSelectChange}
                        disable={carId !== null}
                        valueKey="id"
                        labelKey="value"
                        placeholder="Chọn Xe"
                        searchPlaceholder="Tìm kiếm Xe..."
                        emptyText="Không tìm thấy Xe."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="inspectionDate"
              render={({ field }) => {
                const selectedHour = field.value?.getHours() ?? 0;
                const selectedMinute = field.value?.getMinutes() ?? 0;
                const handleTimeChange = (type: "hour" | "minute", value: string) => {
                  const date = new Date(field.value ?? new Date());

                  if (type === "hour") {
                    date.setHours(Number(value));
                  } else if (type === "minute") {
                    date.setMinutes(Number(value));
                  }

                  field.onChange(date); // Assumes you're using React Hook Form or similar
                };
                const handleDateChange = (newDate: Date | undefined) => {
                  const current = field.value ?? new Date();
                  if (!newDate) {
                    newDate = new Date();
                  }

                  const updated = new Date(
                    newDate.getFullYear(),
                    newDate.getMonth(),
                    newDate.getDate(),
                    current.getHours(),
                    current.getMinutes()
                  );

                  field.onChange(updated);
                };
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Thời gian xác minh</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/dd/yyyy hh:mm aa")
                            ) : (
                              <span>MM/DD/YYYY hh:mm aa</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="sm:flex">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={handleDateChange}
                            initialFocus
                          />
                          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                            {/* Hours */}
                            <ScrollArea className="w-64 sm:w-auto">
                              <div className="flex sm:flex-col p-2">
                                {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                                  const disabled = isTimeDisabled(hour, selectedMinute);
                                  return (
                                    <Button
                                      key={hour}
                                      size="icon"
                                      variant={
                                        selectedHour === hour ? "default" : "ghost"
                                      }
                                      disabled={disabled}
                                      className="sm:w-full shrink-0 aspect-square"
                                      onClick={() => handleTimeChange("hour", hour.toString())}
                                    >
                                      {hour.toString().padStart(2, "0")}
                                    </Button>
                                  );
                                })}
                              </div>
                              <ScrollBar orientation="horizontal" className="sm:hidden" />
                            </ScrollArea>

                            {/* Minutes */}
                            <ScrollArea className="w-64 sm:w-auto">
                              <div className="flex sm:flex-col p-2">
                                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => {
                                  const disabled = isTimeDisabled(selectedHour, minute);
                                  return (
                                    <Button
                                      key={minute}
                                      size="icon"
                                      variant={
                                        selectedMinute === minute ? "default" : "ghost"
                                      }
                                      disabled={disabled}
                                      className="sm:w-full shrink-0 aspect-square"
                                      onClick={() => handleTimeChange("minute", minute.toString())}
                                    >
                                      {minute.toString().padStart(2, "0")}
                                    </Button>
                                  );
                                })}
                              </div>
                              <ScrollBar orientation="horizontal" className="sm:hidden" />
                            </ScrollArea>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="reportId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{reportId !== undefined ? "Địa Chỉ Xét Xe" : ""}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập Địa Chỉ"
                      type={reportId !== undefined ? "text" : "hidden"}
                      disabled={!!reportId}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inspectionAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa Chỉ Xét Xe</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập Địa Chỉ" type="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="flex justify-center w-1/4 mx-auto" type="submit">
              {isLoading ? <LoadingSpinner /> : "Tạo"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
