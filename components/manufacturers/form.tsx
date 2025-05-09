import { useManufacturerForm } from "@/hooks/manufacture/use-form-manufacturer";
import { useKeywordStore } from "@/stores/store";
import React, { useCallback, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ManufacturePayload } from "@/constants/models/manufacture.model";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import Image from "next/image";
import { LoadingSpinner } from "../ui/loading-spinner";

interface ManufacturerFormProps {
  id: string;
  value: ManufacturePayload;
}

type KeywordType = {
  name: string;
  value: string;
  form: React.JSX.Element;
};
const ManufacturerForm = ({ id, value }: ManufacturerFormProps) => {
  const [localUrl, setLocalUrl] = useState<string>('');
  const { keyword } = useKeywordStore();

  const { form, onSubmit, isLoading } = useManufacturerForm({
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
      value: "Tạo nhà sản xuất",
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
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Logo"
                    accept="image/*"
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
                    alt="preview"
                    width={320}
                    height={240}
                    objectFit="contain"
                    layout="responsive" />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )
    },
    {
      name: "update",
      value: "Cập nhật nhà sản xuất",
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
                    alt="preview"
                    width={320}
                    height={240}
                    objectFit="contain"
                    layout="responsive" />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )
    },
    {
      name: "delete",
      value: "Xóa nhà sản xuất",
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

export default ManufacturerForm;
