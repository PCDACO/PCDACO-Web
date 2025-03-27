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
  DialogTitle,
} from "@/components/ui/dialog";
import { ModelPayLoad } from "@/constants/models/model.model.ts";
import { useModelForm } from "@/hooks/models/use-form-model";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { ManufactureResponse } from "@/constants/models/manufacture.model";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";

interface ModelsFormProps {
  id: string;
  value: ModelPayLoad;
  manufacturers: ManufactureResponse[];
}
type KeywordType = {
  name: string;
  value: string;
  form: React.JSX.Element;
};
const ModelForm = ({ id, value, manufacturers }: ModelsFormProps) => {
  const { keyword } = useKeywordStore();
  const { form, onSubmit, isLoading } = useModelForm({
    id,
    value,
    action: keyword
  });

  const keywords: KeywordType[] = [
    {
      name: "create",
      value: "Create Manufacturer",
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
            name="manufacturerId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn Kĩ Thuật Viên" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {manufacturers.map(item => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                      )
                      ) ?? []}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="releaseDate"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
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
                </FormItem>
              );
            }}
          />
        </>
      )
    },
    {
      name: "update",
      value: "Update Manufacturer",
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
      value: "Delete Manufacturer",
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
      <CardTitle>
        {selected.form}
      </CardTitle>
      : null;
  };
  return (
    <Card>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <CardHeader>
            {GetTitle(keyword)}
            <CardDescription>
              {keyword === 'delete' ? (<h1>Bạn có muốn xóa không</h1>) : <></>}
            </CardDescription>
          </CardHeader>
          {GetComponent(keyword)}
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ModelForm;
