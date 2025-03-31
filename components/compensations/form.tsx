import { useCompensationForm } from "@/hooks/compensations/use-form-compensation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { useEffect } from "react";

interface Props {
  id: string;
  userId: string;
  isOpen: boolean;
  onOpenChange: () => void;
}
export default function CompensationForm({ id, userId, isOpen, onOpenChange }: Props) {
  const { form, isLoading, onSubmit } = useCompensationForm({
    id: id,
    value: {
      userId: userId,
      compensationReason: "",
      compensationAmount: 0,
    }
  });
  useEffect(() => {
    form.setValue("reportId", id);
    form.setValue("userId", userId);
    //eslint-disable-next-line
  }, [id, userId])
  return <>
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <DialogHeader>
              <DialogDescription>
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="compensationReason"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Lí do
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập lí do" />
                    </FormControl>
                  </FormItem>
                )
              }} />
            <FormField
              control={form.control}
              name="compensationAmount"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      Số lượng
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập số lượng"
                        type="number"
                        {...form.register("compensationAmount", { valueAsNumber: true })}
                      />
                    </FormControl>
                  </FormItem>
                )
              }} />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  </>
}
