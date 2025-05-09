import { CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import Image from "next/image"
import { Button } from "../ui/button"
import { Preview } from "./details"
import { ChangeEvent } from "react"

interface Props {
  open: boolean;
  onClose: () => void;
  note: string;
  handleNoteChange: (e: ChangeEvent<HTMLInputElement>) => void;
  previews: Preview[];
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemove: (index: number) => void;
  handleApproveIncidentSubmit: () => void;
}
const ApproveIncidentInspectionDialog = ({
  open,
  onClose,
  previews,
  note,
  handleRemove,
  handleFileChange,
  handleNoteChange,
  handleApproveIncidentSubmit
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Label>Nhập lí do</Label>
        <Input value={note} onChange={handleNoteChange} />
        <Label>Nhập ảnh</Label>
        <Input type="file" accept="file/*" multiple onChange={handleFileChange} />
        {
          !!previews && previews.length > 0 && (
            <div className="flex flex-wrap gap-4 border ">
              {previews.map((file, idx) => (
                <div key={idx} className="relative ">
                  <div className="h-52 w-52">
                    <Image
                      key={idx}
                      src={file.url}
                      alt={`Preview ${idx + 1}`}
                      fill
                      className="my-auto object-contain"
                    />
                  </div>
                  <button
                    onClick={() => handleRemove(idx)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: "rgba(0,0,0,0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )
        }
        <DialogFooter>
          <Button onClick={handleApproveIncidentSubmit}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Hoàn tất
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ApproveIncidentInspectionDialog;
