"use client";
import React from "react";
import {
  useDialogStore,
  useParamStore,
} from "@/stores/store";
import { useOwnerQuery } from "@/hooks/owners/use-owner";
import { Button } from "../ui/button";
import { ChevronLeft, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { formatDate } from "@/lib/utils";
import LicenseDetailDialog from "./license-detail-dialog";
import SearchInput from "../input/search-input";
const PendingOwnerTable = () => {
  const { value } = useParamStore();
  const { listOwnerApprovalQuery } = useOwnerQuery({
    params: value,
  });
  const { open, setOpen } = useDialogStore();

  // do ui error
  if (listOwnerApprovalQuery.isError) {
    return <div>Error...</div>;
  }
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-6">
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {listOwnerApprovalQuery.data?.value?.items.map((driver) => (
              <div key={driver.id}>
                <Card
                  key={driver.id}
                  className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
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
                  </CardContent>
                  <CardFooter className="px-4 pb-4 pt-0">
                    <Button
                      className="w-full bg-slate-800 hover:bg-slate-900"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      Review Application
                    </Button>
                  </CardFooter>
                </Card>
                <LicenseDetailDialog approval={driver} isOpen={open} onClose={() => setOpen(false)} id={driver.id} />
              </div>
            )) ?? []}
          </div>
        </div>
      </div>
    </div >
  );
};

export default PendingOwnerTable;
