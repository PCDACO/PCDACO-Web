import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useReportForm } from "@/hooks/reports/use-form-report";
import { ApproveReportPayload } from "@/constants/models/report.model";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { ImageIcon, X } from "lucide-react";
import { Label } from "../ui/label";
import Image from "next/image";

interface Props {
  id: string;
  value: ApproveReportPayload;
  isOpen: boolean;
  onOpenChange: () => void;
}
export default function ApproveReportForm({ id, value, isOpen, onOpenChange }: Props) {
  const [previews, setPreviews] = useState<string[]>([])
  const { form, isLoading, onSubmit } = useReportForm({
    id: id,
    value: value
  });

  const images = form.watch("images")

  // Generate previews when files change
  useEffect(() => {
    if (!images || images.length === 0) return

    const urls: string[] = []
    for (let i = 0; i < images.length; i++) {
      const url = URL.createObjectURL(images[i])
      urls.push(url)
    }

    setPreviews(urls)

    // Clean up object URLs to avoid memory leaks
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [images])



  const removeImage = (index: number) => {
    if (!images) return

    const dt = new DataTransfer()
    for (let i = 0; i < images.length; i++) {
      if (i !== index) {
        dt.items.add(images[i])
      }
    }
    form.setValue("images", dt.files)
  }
  return <>
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <DialogTitle> Xác nhận đơn phạt </DialogTitle>
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
            <div className="space-y-2">
              <Label htmlFor="images" className="text-base">
                Upload Images
              </Label>
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="images"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Nhập ảnh</span>
                </Label>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  {...form.register("images", { required: "Yêu cầu ảnh" })}
                />
                <div className="flex-1">
                  {previews.length > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      {previews.length} {previews.length === 1 ? "image" : "images"} được chọn
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Không có ảnh được nhập</p>
                  )}
                </div>
              </div>
            </div>
            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previews.map((preview, index) => (
                  <Card key={preview} className="relative overflow-hidden group aspect-square">
                    <Image
                      src={preview || "/placeholder.png"}
                      alt={`Preview ${index + 1}`}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            )}
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
