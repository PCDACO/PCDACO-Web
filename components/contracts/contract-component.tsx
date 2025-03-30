'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Check } from 'lucide-react'
import { useContractMutation } from '@/hooks/contracts/use-contract'

interface Props {
  id: string;
  contractHtml: Document;
}

export default function ContractViewer({ id, contractHtml }: Props) {
  const [showAcceptDialog, setShowAcceptDialog] = useState(false)
  const { approveContract } = useContractMutation();

  const handleAccept = async () => {
    approveContract.mutate(id);
  }

  return (
    <div className="flex flex-col justify-start">
      {/* Contract Viewer */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Xem hợp đồng</h2>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowAcceptDialog(true)}
              variant="default"
              className="flex items-center gap-2"
            >
              <Check size={18} />
              Chấp nhận
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

      {/* Accept Dialog */}
      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận chấp nhận hợp đồng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn chấp nhận hợp đồng này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleAccept} className="bg-green-600 hover:bg-green-700">
              Xác nhận chấp nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
