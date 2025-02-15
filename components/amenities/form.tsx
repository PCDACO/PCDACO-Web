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
import { useAmenityForm } from "@/hooks/amenities/use-form-amenities";
import { AmenityPayLoad } from "@/constants/models/amenity.model";

interface AmenityFormProps {
  id: string;
  value: AmenityPayLoad;
}
type KeywordType = {
  name: string;
  value: string;
  form: React.JSX.Element;
};
const AmenityForm = ({ id, value }: AmenityFormProps) => {
  const { keyword } = useKeywordStore();
  const { form, onSubmit, isLoading } = useAmenityForm({
    id,
    value,
    action: keyword
  });

  const keywords: KeywordType[] = [
    {
      name: "create",
      value: "Create Amenity",
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
          <FormField
            control={form.control}
            name="description"
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
            name="icon"
            render={({ field: { onChange, value, ...field } }) => {
              return (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files?.length) {
                          onChange(files[0]);
                        }
                      }}
                      className="w-full"
                    />
                  </FormControl>
                  {value && (
                    <div className="mt-2">
                      <p>Selected file: {value.item.name}</p>
                    </div>
                  )}
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
      value: "Update Amenity",
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
          <FormField
            control={form.control}
            name="description"
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
            name="icon"
            render={({ field: { onChange, value, ...field } }) => {
              return (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files?.length) {
                          onChange(files[0]);
                        }
                      }}
                      className="w-full"
                    />
                  </FormControl>
                  {value && (
                    <div className="mt-2">
                      <p>Selected file: {value.item.name}</p>
                    </div>
                  )}
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
      value: "Delete Amenity",
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

export default AmenityForm;
