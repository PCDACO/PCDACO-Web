"use client"

import { useParamStore } from "@/stores/store";
import SearchInput from "../input/search-input";
import PaginationTable from "../data-table/pagination";
import { DataTable } from "../data-table";
import { BookingColumns } from "./column";
import { useBookingQuery } from "@/hooks/bookings/use-booking";

export default function BookingTable() {
  const { value } = useParamStore();
  const { listBookings } = useBookingQuery({
    params: value
  });
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="manufacture" />
        <div className="flex items-center space-x-4">
          <PaginationTable
            value={listBookings?.data?.value ?? {
              items: [],
              totalItems: 0,
              pageNumber: 1,
              pageSize: 10,
              hasNext: false,
            }}
          />
        </div>
      </div>
      <DataTable
        columns={BookingColumns}
        data={listBookings.data?.value.items ?? []}
        isLoading={listBookings.isLoading}
      />
    </div>
  )
}
