"use client"
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useCarReportMutation } from "@/hooks/car-reports/use-car-reports";
import { ChangeEvent, useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { Label } from "../ui/label";
import { LoadingSpinner } from "../ui/loading-spinner";

interface Props {
  id: string;
  isOpen: boolean;
  onOpenChange: () => void;
}
const ApproveCarReportDialog = ({ id, isOpen, onOpenChange }: Props) => {
  const [note, setNote] = useState("");
  const { approveCarReport } = useCarReportMutation();

  const handleSetNote = (e: ChangeEvent<HTMLInputElement>) => setNote(e.currentTarget.value);

  const handleSubmit = () => {
    approveCarReport.mutate({ id, note });
  }

  return <>
    <Dialog open={isOpen} onOpenChange={onOpenChange} >
      <DialogContent>
        <DialogTitle> Xác nhận báo cáo</DialogTitle>
        <DialogHeader>
        </DialogHeader>
        <Label> Note </Label>
        <Input onChange={handleSetNote} />
        <DialogFooter>
          <Button disabled={approveCarReport.isLoading} className="shadow-md" variant="outline" onClick={handleSubmit} >
            {
              approveCarReport.isLoading ? <LoadingSpinner /> : <>
                <CheckCircle2Icon />
                Hoàn tất
              </>
            }
          </Button>
        </DialogFooter>
      </DialogContent >
    </Dialog >
  </>
}

export default ApproveCarReportDialog;
