'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { useContractMutation } from '@/hooks/contracts/use-contract'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../ui/dialog'
import SignaturePad from 'react-signature-canvas'
import { useDialogStore } from '@/stores/store'

interface Props {
  id: string;
  contractHtml: Document;
}

export default function ContractViewer({ id, contractHtml }: Props) {
  const { open, setOpen } = useDialogStore();
  const { approveContract } = useContractMutation();
  const [sign, setSign] = useState<SignaturePad | null>();
  const [disableClear, setDisableClear] = useState(true);
  const [disableSave, setDisableSave] = useState(true);
  const handleClearClick = () => {
    setDisableClear(true);
    setDisableSave(true);
    if (sign) {
      sign.clear();
    }
  }

  const handleSaveClick = () => {
    if (sign) {
      approveContract.mutate({ id, signature: sign.getTrimmedCanvas().toDataURL('image/png', 100) });
    }
  }

  return (
    <div className="flex flex-col justify-start">
      {/* Contract Viewer */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Xem hợp đồng</h2>
          <div className="flex gap-3">
            <Button
              onClick={() => setOpen(true)}
              variant="ghost"
              className="flex items-center gap-2"
            >
              <Check size={18} />
              Kí tên
            </Button>
          </div>
        </div>

        <div className="contract-content p-6 max-h-[70vh] overflow-y-auto">
          {contractHtml ? (
            <div
              className="contract-html-content"
              dangerouslySetInnerHTML={{
                __html: contractHtml.toString()
              }}
            />
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)} >
        <DialogContent className='flex flex-col justify-between min-w-[1000] min-h-[750]'>
          <DialogTitle>
            Kí tên
          </DialogTitle>
          <SignaturePad
            penColor='black'
            canvasProps={{
              style: {
                width: "100%",
                height: '600px',
                border: 1,
                borderStyle: 'dashed',
                borderRadius: "5px"
              }
            }}
            onEnd={() => {
              setDisableClear(false);
              setDisableSave(false);
            }}
            ref={data => setSign(data)}
          />
          <DialogFooter>
            <div className='flex justify-end'>
              <Button className='w-24' disabled={disableClear} onClick={handleClearClick}>
                <X size={18} /> Xóa
              </Button>
              <Button className='w-24 mx-6' disabled={disableSave} onClick={handleSaveClick}>
                <Check size={18} /> Kí
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
