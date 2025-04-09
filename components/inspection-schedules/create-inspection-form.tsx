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
import { Checkbox } from "../ui/checkbox";
import SelectWithSearch from "../ui/select-search";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface SelectParams {
  id: string;
  value: string;
}

interface InspectionScheduleFormProps {
  id: string;
  value: InspectionSchedulePayload;
  cars: CarResponse[];
  technicians: TechnicianResponse[];
}
export default function CreateInspectionForm({
  id,
  value,
  cars,
  technicians,
}: InspectionScheduleFormProps) {
  const searchParams = useSearchParams();
  const carId = searchParams.get("carId");
  const type = searchParams.get("type");

  const { form, isLoading, onSubmit } = useInspectionScheduleForm({
    id,
    value,
  });

  useEffect(() => {
    if (carId) {
      form.setValue("carId", carId);
    }

    if (type === "Report") {
      form.setValue("isIncident", true);
    } else {
      form.setValue("isIncident", false);
    }
  }, [carId, form, type]);

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("inspectionDate", date);
    }
  }

  function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
    const currentDate = form.getValues("inspectionDate") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }
    form.setValue("inspectionDate", newDate);
  }
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
            <FormField
              control={form.control}
              name="inspectionDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Enter your date & time (12h)</FormLabel>
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
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                          <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                              {Array.from({ length: 12 }, (_, i) => i + 1)
                                .reverse()
                                .map((hour) => (
                                  <Button
                                    key={hour}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      field.value.getHours() % 12 === hour % 12
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange("hour", hour.toString())
                                    }
                                  >
                                    {hour}
                                  </Button>
                                ))}
                            </div>
                            <ScrollBar
                              orientation="horizontal"
                              className="sm:hidden"
                            />
                          </ScrollArea>
                          <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                              {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                (minute) => (
                                  <Button
                                    key={minute}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      field.value.getMinutes() === minute
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange(
                                        "minute",
                                        minute.toString()
                                      )
                                    }
                                  >
                                    {minute.toString().padStart(2, "0")}
                                  </Button>
                                )
                              )}
                            </div>
                            <ScrollBar
                              orientation="horizontal"
                              className="sm:hidden"
                            />
                          </ScrollArea>
                          <ScrollArea className="">
                            <div className="flex sm:flex-col p-2">
                              {["AM", "PM"].map((ampm) => (
                                <Button
                                  key={ampm}
                                  size="icon"
                                  variant={
                                    field.value &&
                                    ((ampm === "AM" &&
                                      field.value.getHours() < 12) ||
                                      (ampm === "PM" &&
                                        field.value.getHours() >= 12))
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() => handleTimeChange("ampm", ampm)}
                                >
                                  {ampm}
                                </Button>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {carId && type === "Report" && (
              <FormField
                control={form.control}
                name="isIncident"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={true}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Là Sự Cố ?</FormLabel>
                      <FormDescription></FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            )}
            <Button className="flex justify-center w-1/4 mx-auto" type="submit">
              {isLoading ? <LoadingSpinner /> : "Tạo"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
