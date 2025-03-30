"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import {
  useParamStore,
} from "@/stores/store";
import SearchInput from "@/components/input/search-input";
import PaginationTable from "../data-table/pagination";
import { useGPSDeviceQuery } from "@/hooks/gps-device/use-gps-device";
import { GPSDeviceColumns } from "./column";

const GPSDeviceTable = () => {
  const { value } = useParamStore();
  const { listGPSDeviceQuery } = useGPSDeviceQuery({
    params: value,
  });


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="gps-device" />
        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              listGPSDeviceQuery.data?.value ?? {
                items: [],
                totalItems: 0,
                pageNumber: 1,
                pageSize: 10,
                hasNext: false,
              }
            }
          />
        </div>
      </div>
      <DataTable
        columns={GPSDeviceColumns}
        data={listGPSDeviceQuery.data?.value?.items ?? []}
        isLoading={listGPSDeviceQuery.isLoading}
      />
    </div>
  );
};

export default GPSDeviceTable;
