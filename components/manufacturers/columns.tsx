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
import { GetManufacturersResponse } from "@/domains/models/manufacturers/getManufacturers.response";
import { useState } from "react";
import { ManufacturerDeleteDialog } from "@/components/manufacturers/delete-dialog";
import { ManufacturerUpdateDialog } from "@/components/manufacturers/update-dialog";
import { useDeleteManufacturerRequest, useUpdateManufacturerRequest } from "@/domains/stores/store";
import { redirect } from "next/navigation";


export const columns: ColumnDef<GetManufacturersResponse>[] = [
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
            const handleRedirect = () => {
                console.log("CON CAC");
                // eslint-disable-next-line react-hooks/rules-of-hooks
                redirect(`/manufacturers/${data.id}/models`);
            }
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [IsDeleteOpen, SetIsDeleteOpen] = useState(false);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [IsUpdateOpen, SetIsUpdateOpen] = useState(false);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const updateAmenityRequest = useUpdateManufacturerRequest();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const deleteRequest = useDeleteManufacturerRequest();
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
                        <DropdownMenuItem onClick={handleRedirect}>
                            Xem các mã xe
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            updateAmenityRequest.setId(data.id);
                            updateAmenityRequest.setName(data.name);
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
                    <ManufacturerDeleteDialog isOpen={IsDeleteOpen} onClose={closeDeleteDialog} />
                    <ManufacturerUpdateDialog isOpen={IsUpdateOpen} onClose={closeUpdateDialog} />
                </>
            );
        },
    },
];