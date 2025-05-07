"use client"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useReportForm } from "@/hooks/reports/use-form-report";
import { ApproveReportPayload } from "@/constants/models/report.model";
import { LoadingSpinner } from "../ui/loading-spinner";

interface Props {
  id: string;
  value: ApproveReportPayload;
  isOpen: boolean;
  onOpenChange: () => void;
}
export default function ApproveReportForm({ id, value, isOpen, onOpenChange }: Props) {
  const { form, isLoading, onSubmit } = useReportForm({
    id: id,
    value: value
  });
  return <>
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <DialogTitle> Xác nhận </DialogTitle>
            <DialogHeader>
            </DialogHeader>
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Note
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập ghi chú" />
                    </FormControl>
                  </FormItem>
                )
              }} />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : "Hoàn thành"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  </>
}
