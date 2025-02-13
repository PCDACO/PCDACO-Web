import { useManufacturerForm } from "@/hooks/manufacture/use-form-manufacturer";
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
import { ManufacturePayload } from "@/constants/models/manufacture.model";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ManufacturerFormProps {
  id: string;
  value: ManufacturePayload;
}
const ManufacturerForm = ({ id, value }: ManufacturerFormProps) => {
  const { keyword } = useKeywordStore();

  const { form, onSubmit, isLoading } = useManufacturerForm({
    id,
    value,
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <DialogHeader>
          <DialogTitle>
            {keyword === "create"
              ? "Create Manufacturer"
              : "Update Manufacturer"}
          </DialogTitle>
          <DialogDescription>
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
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ManufacturerForm;
