'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { useContractMutation } from '@/hooks/contracts/use-contract'
import SignaturePad from 'react-signature-canvas'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'

interface Props {
  id: string;
  contractHtml: Document;
}

export default function ContractViewer({ id, contractHtml }: Props) {
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
    <div className="grid grid-cols-2 gap-8 h-[calc(100vh-150px)] m-4">
      {/* Contract Viewer */}
      <div className="bg-white rounded-lg shadow-lg overflow-y-auto p-4">
        <div className="contract-content p-6 max-h-3/4 overflow-y-auto">
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
      <div className='flex items-center'>
        <Card>
          <CardContent className='mt-5'>
            <CardTitle> Kí tên </CardTitle>
            <SignaturePad
              penColor='black'
              canvasProps={{
                style: {
                  marginTop: "10px",
                  width: "100%",
                  height: '600px',
                  border: 1,
                  borderStyle: 'dashed',
                  borderRadius: "5px",
                }
              }}
              onEnd={() => {
                setDisableClear(false);
                setDisableSave(false);
              }}
              ref={data => setSign(data)}
            />
            <CardFooter>
              <div className='mt-8 flex justify-end w-full items-center'>
                <Button className='w-24' disabled={disableClear} onClick={handleClearClick}>
                  <X size={18} /> Xóa
                </Button>
                <Button className='w-24 ml-6' disabled={disableSave} onClick={handleSaveClick}>
                  <Check size={18} /> Kí
                </Button>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>

  )
}
