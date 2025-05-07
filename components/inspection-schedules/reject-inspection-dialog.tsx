import { CheckIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Textarea } from "../ui/textarea";
import { ChangeEvent } from "react";
import { Button } from "../ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  rejectNote: string;
  handleRejectNoteChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleRejectNoteSubmit: () => void;
}
const RejectInspectionDialog = ({
  open,
  onClose,
  rejectNote,
  handleRejectNoteSubmit,
  handleRejectNoteChange
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Từ chối xác minh</DialogTitle>
          <DialogDescription>Hãy điền lí do từ chối lịch xác minh này</DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Reason for rejection..."
          value={rejectNote}
          onChange={handleRejectNoteChange}
          className="min-h-[100px]"
        />
        <DialogFooter className="mt-4">
          <Button variant="destructive" onClick={handleRejectNoteSubmit}>
            <CheckIcon />
            Hoàn thành
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RejectInspectionDialog;
