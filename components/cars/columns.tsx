"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { GetCarsResponse } from "@/domains/models/cars/getcars.response";
import { AmenityDeleteDialog } from "@/components/amenities/delete-dialog";
import { useState } from "react";

export const columns: ColumnDef<GetCarsResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer",
  },
  {
    accessorKey: "ownerName",
    header: "Owner",
  },
  {
    accessorKey: "licensePlate",
    header: "License Plate",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "seat",
    header: "Seat",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "transmissionType",
    header: "Transmission Type",
  },
  {
    accessorKey: "fuelType",
    header: "Fuel Type",
  },
  {
    accessorKey: "fuelConsumption",
    header: "Fuel Consumption",
  },
  {
    id: "actions",
    // header: () => (
    //     <Button className="container bg-slate-300"
    //         variant="outline"
    //         onClick={() => alert("Actions header button clicked!")}
    //     >
    //         Create
    //     </Button>
    // ),
    cell: ({ row }) => {
      const payment = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [IsOpen, SetIsOpen] = useState(false);
      const openDeleteDialog = () => SetIsOpen(true); // Open dialog
      const closeDeleteDialog = () => SetIsOpen(false); // Close dialog
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={openDeleteDialog}
                className="bg-red-700"
              >
                <h2 className="text-white">Update</h2>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="bg-yellow-600">
                <h2 className="text-white">Delete</h2>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AmenityDeleteDialog isOpen={IsOpen} onClose={closeDeleteDialog} />
        </>
      );
    },
  },
];
