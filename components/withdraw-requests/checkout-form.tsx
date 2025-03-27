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
import Image from "next/image";
import { WithdrawRequestPayload } from "@/constants/models/withdraw-request.model";
import { useWithdrawRequestForm } from "@/hooks/withdraw-requests/use-withdraw-request-form";

interface Props {
  id: string;
}
const WithdrawRequestForm = ({ id }: Props) => {
  const [localUrl, setLocalUrl] = useState<string>('');
  const { form, onSubmit, isLoading } = useWithdrawRequestForm({
    id
  });
  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setLocalUrl(objectUrl);
    } else {
      setLocalUrl("");
    }
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <DialogHeader>
          <DialogTitle>
            Hoàn Tất Thanh Toán
          </DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <FormField
          control={form.control}
          name="adminNote"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Note"
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
          name="transactionProof"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bằng Chứng</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Picture"
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
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default WithdrawRequestForm;
