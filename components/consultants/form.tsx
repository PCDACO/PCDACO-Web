"use client"
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { useUserRoleQuery } from "@/hooks/user-roles/use-user-roles";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useConsultantForm } from "@/hooks/consultants/use-form-consultant";
import { ConsultantPayload } from "@/constants/models/consultant.model";
import { LoadingSpinner } from "../ui/loading-spinner";

interface ConsultantFormProps {
  id: string;
  value: ConsultantPayload;
}
type KeywordType = {
  name: string;
  value: string;
  form: React.JSX.Element;
};
const ConsultantForm = ({ id, value }: ConsultantFormProps) => {
  const keyword = "create";
  const { form, onSubmit, isLoading } = useConsultantForm({
    id,
    value,
    action: keyword
  });
  const { listUserRoles } = useUserRoleQuery({
    params: {
      index: 1,
      size: 1000,
      keyword: "Consultant"
    }
  });

  useEffect(() => {
    if (listUserRoles.data?.value.items && listUserRoles.data?.value.items.length <= 0) return;
    form.setValue("roleName", listUserRoles.data?.value?.items[0].name ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUserRoles]);
  const keywords: KeywordType[] = [
    {
      name: "create",
      value: "Tạo tư vấn viên",
      form: (
        <div className="space-y-4 h-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập Tên</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập Tên"
                    type=""
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập Email"
                    type="email"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật Khẩu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập Mật Khẩu"
                    type="password"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa Chỉ</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập Địa Chỉ"
                    type="text"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ngày Sinh</FormLabel>
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
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số Điện Thoại</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập Số Điện Thoại"
                    type=""
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )
    },
    {
      name: "delete",
      value: "Xóa tư vấn viên",
      form: (
        <></>
      )
    }
  ];
  const GetTitle = (name: string) => {
    const selected = keywords.find(k => k.name === name);
    return selected ?
      <>
        {selected.value}
      </>
      : null;
  };
  const GetComponent = (name: string) => {
    const selected = keywords.find(k => k.name === name);
    return selected ?
      <>
        {selected.form}
      </>
      : null;
  };
  return (
    <Card className="container my-8">
      <CardHeader className="mx-auto text-center">
        {GetTitle(keyword)}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            {GetComponent(keyword)}
            <Button className="mx-auto w-full" type="submit" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ConsultantForm;
