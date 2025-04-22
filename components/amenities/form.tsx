import { useKeywordStore } from "@/stores/store";
import React, { useCallback, useState } from "react";
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
import Image from "next/image";

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
  const [localUrl, setLocalUrl] = useState<string>('');
  const { keyword } = useKeywordStore();
  const { form, onSubmit, isLoading } = useAmenityForm({
    id,
    value,
    action: keyword
  });
  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setLocalUrl(objectUrl);
    } else {
      setLocalUrl("");
    }
  }, []);
  const keywords: KeywordType[] = [
    {
      name: "create",
      value: "Tạo tiện nghi",
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Description"
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Picture"
                    accept="image/svg"
                    onChange={(event) => {
                      const files = (event.target as HTMLInputElement).files;
                      if (!files) return;
                      const file = files && files[0];
                      field.onChange(files); // Update form value
                      handleFileChange(file || null); // Update local URL
                    }}
                  />
                </FormControl>
                {localUrl !== "" && (
                  <Image src={localUrl}
                    alt="Preview"
                    width={320}
                    height={240}
                    objectFit="contain"
                    layout="responsive" />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )
    },
    {
      name: "update",
      value: "Cập nhật tiện nghi",
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Description"
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Picture"
                    accept="image/svg"
                    onChange={(event) => {
                      const files = (event.target as HTMLInputElement).files;
                      if (!files) return;
                      const file = files && files[0];
                      field.onChange(files); // Update form value
                      handleFileChange(file || null); // Update local URL
                    }}
                  />
                </FormControl>
                {localUrl !== "" && (
                  <Image src={localUrl}
                    alt="Preview"
                    width={320}
                    height={240}
                    objectFit="contain"
                    layout="responsive" />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )
    },
    {
      name: "delete",
      value: "Xóa tiện nghi",
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
            {isLoading ? "Loading..." : "Hoàn tất"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AmenityForm;
