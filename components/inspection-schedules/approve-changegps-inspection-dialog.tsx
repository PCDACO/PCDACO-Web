import React, { ChangeEvent } from "react";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoadingSpinner } from "../ui/loading-spinner";
import { CheckCircle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  note: string;
  handleNoteChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleApproveNoteSubmit: () => void;
  isLoading: boolean;
}
const ApproveChangeGPSInspectionDialog = ({
  open,
  onClose,
  note,
  handleNoteChange,
  handleApproveNoteSubmit,
  isLoading
}: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent>
        <Label>Nhập lí do</Label>
        <Input value={note} onChange={handleNoteChange} />
        <DialogFooter>
          <Button disabled={isLoading} onClick={handleApproveNoteSubmit}>
            {isLoading ? <LoadingSpinner /> : <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Hoàn tất
            </>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ApproveChangeGPSInspectionDialog;
