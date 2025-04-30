"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useContractMutation } from "@/hooks/contracts/use-contract";
import SignaturePad from "react-signature-canvas";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { LoadingSpinner } from "../ui/loading-spinner";

interface Props {
  id: string;
  contractHtml: Document;
}

export default function ContractViewer({ id, contractHtml }: Props) {
  const { approveContract } = useContractMutation();
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const [disableClear, setDisableClear] = useState(true);
  const [disableSave, setDisableSave] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClearClick = () => {
    setDisableClear(true);
    setDisableSave(true);
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSaveClick = () => {
    if (signaturePadRef.current) {
      const signature = signaturePadRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png", 100);
      approveContract.mutate({ id, signature });
    }
  };

  return (
    <div
      className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"
        } gap-8 h-[calc(100vh-150px)] m-4`}
    >
      {/* Contract Viewer */}
      <div className="bg-white rounded-lg shadow-lg overflow-y-auto p-4">
        <div className="contract-content p-6 max-h-3/4 overflow-y-auto">
          {contractHtml ? (
            <div
              className="contract-html-content"
              dangerouslySetInnerHTML={{
                __html: contractHtml.toString(),
              }}
            />
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <Card className="w-full">
          <CardContent className="mt-5">
            <CardTitle> Kí tên </CardTitle>
            <div
              className="relative w-full"
              style={{ height: isMobile ? "300px" : "600px" }}
            >
              <SignaturePad
                penColor="black"
                canvasProps={{
                  style: {
                    width: "100%",
                    height: "100%",
                    border: "1px dashed #ccc",
                    borderRadius: "5px",
                  },
                }}
                onEnd={() => {
                  setDisableClear(false);
                  setDisableSave(false);
                }}
                ref={signaturePadRef}
              />
            </div>
            <CardFooter>
              <div className="mt-8 flex justify-end w-full items-center">
                <Button
                  className="w-24"
                  disabled={disableClear}
                  onClick={handleClearClick}
                >
                  <X size={18} /> Xóa
                </Button>
                <Button className='w-24 ml-6' disabled={disableSave || approveContract.isLoading} onClick={handleSaveClick}>
                  {approveContract.isLoading ?
                    <LoadingSpinner size={18} /> :
                    <><Check size={18} /> Kí</>
                  }
                </Button>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
