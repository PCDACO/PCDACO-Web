"use client";
import React from "react";
import {
  createGenericStore,
  useDialogStore,
  useParamStore,
} from "@/stores/store";
import { useOwnerQuery } from "@/hooks/owners/use-owner";
import { Button } from "../ui/button";
import { ChevronLeft, ReceiptText, User } from "lucide-react";
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
    <>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto px-6">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {
                  listOwnerApprovalQuery.data?.value && (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{listOwnerApprovalQuery.data?.value.items.length} Pending</Badge>
                  )
                }
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <SearchInput keyValue={"pending-approval"} />
                </div>
              </div>
            </div>

            <Card className="sm:min-w-[500] md:min-w-[400] lg:min-w-[1000] ">
              <CardContent>
                {listOwnerApprovalQuery.data?.value?.items?.length > 0 && (
                  listOwnerApprovalQuery.data?.value?.items.map((driver) => (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-auto">
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
                  ))
                )}
                {
                  (!listOwnerApprovalQuery.data?.value?.items || listOwnerApprovalQuery.data?.value?.items.length === 0) && (
                    <div className="flex flex-col items-center justify-center text-center space-y-6 py-8 ">
                      <div className="relative">
                        <div className="absolute -top-2 -right-2">
                          <div className="bg-amber-100 text-amber-700 rounded-full p-1.5">
                            <ReceiptText className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">Không tìm thấy</h3>
                      </div>
                    </div>
                  )
                }
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <LicenseDetailDialog approval={data} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default PendingOwnerTable;
