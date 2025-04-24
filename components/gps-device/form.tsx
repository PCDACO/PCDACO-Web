import { useKeywordStore } from "@/stores/store";
import React, { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GPSDevicePayload } from "@/constants/models/gps-device.model";
import { useGPSDeviceForm } from "@/hooks/gps-device/use-form-gps-device";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface GPSDeviceFormProps {
  id: string;
  value: GPSDevicePayload;
  isOpen: boolean;
  onOpenChange: () => void;
}

type KeywordType = {
  name: string;
  value: string;
  form: React.JSX.Element;
};

const GPSDeviceForm = ({ id, value, isOpen, onOpenChange }: GPSDeviceFormProps) => {
  const { keyword } = useKeywordStore();
  const { form, onSubmit, isLoading } = useGPSDeviceForm({
    id,
    value,
    action: keyword
  });

  useEffect(() => {
    form.setValue("name", value.name);
    form.setValue("status", value.status);
    //eslint-disable-next-line
  }, [id, form])

  const keywords: KeywordType[] = [
    {
      name: "create",
      value: "Xóa thiết bị",
      form: (
        <></>
      )
    },
    {
      name: "update",
      value: "Cập nhật thiết bị",
      form: (
        <>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Name"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value.toString()}
                      onValueChange={(value) => form.setValue("status", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại kiểm tra" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem className="hover:cursor-pointer" value="0">Khả dụng</SelectItem>
                          <SelectItem className="hover:cursor-pointer" value="1">Đang sử dụng</SelectItem>
                          <SelectItem className="hover:cursor-pointer" value="2">Đang sửa chữa</SelectItem>
                          <SelectItem className="hover:cursor-pointer" value="3">Hư hỏng</SelectItem>
                          <SelectItem className="hover:cursor-pointer" value="4">Đã bị tháo dỡ</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </>
      )
    },
    {
      name: "delete",
      value: "Gỡ thiết bị",
      form: (
        <></>
      )
    }
  ];
  const GetTitle = (name: string) => {
    const selected = keywords.find(k => k.name === name);
    return selected ?
      <DialogTitle>
        {selected.value}
      </DialogTitle>
      : null;
  };
  const GetComponent = (name: string) => {
    const selected = keywords.find(k => k.name === name);
    return selected ?
      <DialogTitle>
        {selected.form}
      </DialogTitle>
      : null;
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <DialogHeader>
              {GetTitle(keyword)}
              <DialogDescription>
                {keyword === 'delete' ? (<h1>Bạn có muốn gỡ không</h1>) : <></>}
                {keyword === 'create' ? (<h1>Bạn có muốn gỡ không</h1>) : <></>}
              </DialogDescription>
            </DialogHeader>
            {GetComponent(keyword)}
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Hoàn tất"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GPSDeviceForm;
