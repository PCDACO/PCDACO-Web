"use client"
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface DocumentDialogProps {
  terms: string;
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CarContractDialog = ({ terms, open, onOpenChange }: DocumentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[850] max-w-[1000]" >
        <DialogTitle></DialogTitle>
        <div className="border rounded-md p-4 max-h-[800] overflow-auto">
          <div
            dangerouslySetInnerHTML={{
              __html: terms,
            }}
          />
        </div>
      </DialogContent >
    </Dialog >
  )
}

export default CarContractDialog;
