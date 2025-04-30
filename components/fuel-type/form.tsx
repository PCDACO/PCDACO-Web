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
import { FuelTypePayload } from "@/constants/models/fuelType.model";
import { useFuelTypeForm } from "@/hooks/fuel-type/use-form-fuel-type";
import { LoadingSpinner } from "../ui/loading-spinner";

interface FuelTypeFormProps {
  id: string;
  value: FuelTypePayload;
}
type KeywordType = {
  name: string;
  value: string;
  form: React.JSX.Element;
};
const FuelTypeForm = ({ id, value }: FuelTypeFormProps) => {
  const { keyword } = useKeywordStore();
  const { form, onSubmit, isLoading } = useFuelTypeForm({
    id,
    value,
    action: keyword
  });

  const keywords: KeywordType[] = [
    {
      name: "create",
      value: "Tạo loại nhiên liệu",
      form: (
        <div>
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
        </div>
      )
    },
    {
      name: "update",
      value: "Cập nhật loại nhiên liệu",
      form: (
        <div>
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
        </div>
      )
    },
    {
      name: "delete",
      value: "Xóa loại nhiên liệu",
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
            {isLoading ? <LoadingSpinner /> : "Hoàn tất"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default FuelTypeForm;
