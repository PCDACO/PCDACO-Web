import React, { ChangeEvent } from "react";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  note: string;
  handleNoteChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleApproveNoteSubmit: () => void;
}
const ApproveChangeGPSInspectionDialog = ({
  open,
  onClose,
  note,
  handleNoteChange,
  handleApproveNoteSubmit
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
          <Button onClick={handleApproveNoteSubmit}> Hoàn tất </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ApproveChangeGPSInspectionDialog;
