"use client";
import React from "react";
import { createGenericStore, useDialogStore, useParamStore, } from "@/stores/store";
import { useOwnerQuery } from "@/hooks/owners/use-owner";
import { Button } from "../ui/button";
import { ReceiptText } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import LicenseDetailDialog from "./license-detail-dialog";
import SearchInput from "../input/search-input";
import { OwnerPendingApprovalResponse } from "@/constants/models/owner.model";
import { formatDate } from "@/lib/utils";

export const usePendingApprovalStore = createGenericStore<OwnerPendingApprovalResponse>();

const PendingOwnerTable = () => {
  const { value } = useParamStore();
  const { listOwnerApprovalQuery } = useOwnerQuery({
    params: value,
  });
  const { data, setData } = usePendingApprovalStore();
  const { open, setOpen } = useDialogStore();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between my-6">
        <SearchInput className="w-1/4" keyValue={"pending-approval"} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {listOwnerApprovalQuery.data?.value?.items?.length > 0 && (
          listOwnerApprovalQuery.data?.value?.items.map((driver) => (
            <div key={driver.id} className="card flex flex-col h-full border rounded-lg shadow-sm">
              <div className="card-content p-4">
                <div className="grid gap-4 grid-cols-1">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <span className="h-5 w-5 text-slate-600">{driver.name.charAt(0)}</span>
                    </div>

                    <div>
                      <h3 className="font-medium">{driver.name}</h3>
                      <p className="text-sm text-slate-500">Submitted {formatDate(driver.licenseImageUploadedAt.toString())}</p>
                    </div>
                  </div>

                  <div className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded text-sm w-fit">Pending</div>

                  <div className="flex items-center text-sm">
                    <span className="text-slate-400 mr-2">Phone:</span>
                    <span className="text-slate-700">{driver.phone}</span>
                  </div>
                </div>
              </div>

              <div className="card-footer px-4 pb-4 pt-2 mt-auto">
                <Button
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setData(driver);
                    setOpen(true);
                  }}
                >
                  Review Application
                </Button>
              </div>
            </div>
          )))}
      </div>
      {
        (!listOwnerApprovalQuery.data?.value?.items || listOwnerApprovalQuery.data?.value?.items.length === 0) && (
          <Card className="flex-1">
            <CardContent className="h-full">
              <div className="flex flex-col items-center h-full justify-center text-center space-y-6 py-8">
                <div className="relative">
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-amber-100 text-amber-700 rounded-full p-1.5">
                      <ReceiptText className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Không tìm thấy</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      }
      <LicenseDetailDialog approval={data} isOpen={open} onClose={() => setOpen(false)} />
    </div >
  );
};

export default PendingOwnerTable;
