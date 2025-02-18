import { useKeywordStore } from "@/stores/store";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GPSDevicePayload } from "@/constants/models/gps-device.model";
import { useGPSDeviceForm } from "@/hooks/gps-device/use-form-gps-device";

interface GPSDeviceFormProps {
  id: string;
  value: GPSDevicePayload;
}
type KeywordType = {
  name: string;
  value: string;
  form: React.JSX.Element;
};
const GPSDeviceForm = ({ id, value }: GPSDeviceFormProps) => {
  const { keyword } = useKeywordStore();
  const { form, onSubmit, isLoading } = useGPSDeviceForm({
    id,
    value,
    action: keyword
  });

  const keywords: KeywordType[] = [
    {
      name: "create",
      value: "Create GPS Device",
      form: (
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
      )
    },
    {
      name: "update",
      value: "Update GPS Device",
      form: (
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
      )
    },
    {
      name: "delete",
      value: "Delete GPS Device",
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
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <DialogHeader>
          {GetTitle(keyword)}
          <DialogDescription>
            {keyword === 'delete' ? (<h1>Bạn có muốn xóa không</h1>) : <></>}
          </DialogDescription>
        </DialogHeader>
        {GetComponent(keyword)}
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default GPSDeviceForm;
