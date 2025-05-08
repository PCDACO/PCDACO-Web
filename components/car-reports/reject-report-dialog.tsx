import { CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { ChangeEvent } from "react";
import { LoadingSpinner } from "../ui/loading-spinner";

interface Props {
  open: boolean;
  onClose: () => void;
  resolutionComments: string;
  setResolutionComments: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleReject: () => void;
  isLoading: boolean;
}
export const RejectReportDialog = ({
  open,
  onClose,
  resolutionComments,
  setResolutionComments,
  handleReject,
  isLoading
}: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Từ chối báo cáo</DialogTitle>
          <DialogDescription>
            Vui lòng nhập lý do từ chối báo cáo này.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Nhập lý do từ chối..."
          value={resolutionComments}
          onChange={setResolutionComments}
          className="min-h-[100px]"
        />
        <DialogFooter>
          <Button disabled={isLoading} variant="destructive" onClick={handleReject}>
            {isLoading ? <LoadingSpinner /> : <>
              <CheckCircle className="h-4 w-4" />
              Xác nhận từ chối
            </>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
