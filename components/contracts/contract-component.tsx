'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Check, X } from 'lucide-react'

interface Props {
  id: string;
  contractHtml: Document;
}
export default function ContractViewer({ id, contractHtml }: Props) {
  console.log(id);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [contractStatus, setContractStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending')
  const handleAccept = async () => {
    try {
      // Replace with your actual API endpoint for accepting the contract
      await axios.post('/api/contract/accept')
      setContractStatus('accepted')
      setShowAcceptDialog(false)
    } catch (err) {
      console.error('Error accepting contract:', err)
      // You might want to show an error message here
    }
  }

  const handleReject = async () => {
    try {
      // Replace with your actual API endpoint for rejecting the contract
      await axios.post('/api/contract/reject')
      setContractStatus('rejected')
      setShowRejectDialog(false)
    } catch (err) {
      console.error('Error rejecting contract:', err)
      // You might want to show an error message here
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
              onClick={() => setShowRejectDialog(true)}
              variant="destructive"
              disabled={contractStatus !== 'pending'}
              className="flex items-center gap-2"
            >
              <X size={18} />
              Từ chối
            </Button>
            <Button
              onClick={() => setShowAcceptDialog(true)}
              variant="default"
              disabled={contractStatus !== 'pending'}
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

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận từ chối hợp đồng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn từ chối hợp đồng này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-red-600 hover:bg-red-700">
              Xác nhận từ chối
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
