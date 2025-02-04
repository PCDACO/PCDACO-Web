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
import { useState } from "react";
import { TransmissionDeleteDialog } from "@/components/transmissions/delete-dialog";
import { TransmissionUpdateDialog } from "@/components/transmissions/update-dialog";
import { useDeleteTransmissionRequest, useUpdateTransmissionRequest } from "@/domains/stores/store";
import { GetTransmissionResponse } from "@/domains/models/transmissions/getTransmissions.response";


export const columns: ColumnDef<GetTransmissionResponse>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
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
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [IsUpdateOpen, SetIsUpdateOpen] = useState(false);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const updateRequest = useUpdateTransmissionRequest();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const deleteRequest = useDeleteTransmissionRequest();
            const data = row.original;
            const openDeleteDialog = () => SetIsDeleteOpen(true);  // Open dialog
            const closeDeleteDialog = () => SetIsDeleteOpen(false);  // Close dialog
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
                            console.log(data);
                            updateRequest.setId(data.id);
                            updateRequest.setName(data.name);
                            openUpdateDialog();
                        }} >
                            <h2 >
                                Update
                            </h2>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            deleteRequest.setId(data.id);
                            openDeleteDialog();
                        }} >
                            <h2 >
                                Delete
                            </h2>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
                    <TransmissionDeleteDialog isOpen={IsDeleteOpen} onClose={closeDeleteDialog} />
                    <TransmissionUpdateDialog isOpen={IsUpdateOpen} onClose={closeUpdateDialog} />
                </>
            );
        },
    },
];