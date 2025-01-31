"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { GetAmenitiesResponse } from "@/domains/models/amenities/getamenities.response";
import { useState } from "react";
import { AmenityDeleteDialog } from "./delete-dialog";
import { AmenityUpdateDialog } from "./update-dialog";
import { useDeleteAmenityRequest, useUpdateAmenityRequest } from "@/domains/stores/store";


export const columns: ColumnDef<GetAmenitiesResponse>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [IsDeleteOpen, SetIsDeleteOpen] = useState(false);
            const [IsUpdateOpen, SetIsUpdateOpen] = useState(false);
            const { setId, setDescription, setName } = useUpdateAmenityRequest();
            const deleteRequest = useDeleteAmenityRequest();
            const currentid = row.getValue("id") as string;
            const currentname = row.getValue("name") as string;
            const currentdescription = row.getValue("description") as string;
            const openDeleteDialog = () => SetIsDeleteOpen(true);  // Open dialog
            const closeDeleteDialog = () => SetIsUpdateOpen(false);  // Close dialog
            const openUpdateDialog = () => SetIsUpdateOpen(true);
            const closeUpdateDialog = () => SetIsUpdateOpen(false);


            return (
                <><DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                            setId(currentid);
                            setName(currentname);
                            setDescription(currentdescription);
                            openUpdateDialog();
                        }} className="bg-red-700">
                            <h2 className="text-white">
                                Update
                            </h2>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            deleteRequest.setId(currentid);
                            openDeleteDialog();
                        }} className="bg-yellow-600">
                            <h2 className="text-white">
                                Delete
                            </h2>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                    <AmenityDeleteDialog isOpen={IsDeleteOpen} onClose={closeDeleteDialog} />
                    <AmenityUpdateDialog isOpen={IsUpdateOpen} onClose={closeUpdateDialog} />
                </>
            );
        },
    },
];