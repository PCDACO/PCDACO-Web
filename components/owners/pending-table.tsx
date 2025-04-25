"use client";
import React from "react";
import { createGenericStore, useDialogStore, useParamStore, } from "@/stores/store";
import { useOwnerQuery } from "@/hooks/owners/use-owner";
import { Button } from "../ui/button";
import { ReceiptText, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { formatDate } from "@/lib/utils";
import LicenseDetailDialog from "./license-detail-dialog";
import SearchInput from "../input/search-input";
import { OwnerPendingApprovalResponse } from "@/constants/models/owner.model";

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
      {listOwnerApprovalQuery.data?.value?.items?.length > 0 && (
        listOwnerApprovalQuery.data?.value?.items.map((driver, index) => (
          <Card >
            <CardContent>
              <div key={index} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-auto">
                <div key={driver.id}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{driver.name}</h3>
                        <p className="text-sm text-slate-500">Submitted {formatDate(driver.licenseImageUploadedAt.toString())}</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="flex items-center text-slate-600">
                      <span className="text-slate-400 mr-2">Phone:</span>
                      <span>{driver.phone}</span>
                    </div>
                  </div>
                  <CardFooter className="px-4 pb-4 pt-0">
                    <Button
                      className="w-full bg-slate-800 hover:bg-slate-900"
                      onClick={() => {
                        setData(driver);
                        setOpen(true);
                      }}
                    >
                      Review Application
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
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
    </div>
  );
};

export default PendingOwnerTable;
