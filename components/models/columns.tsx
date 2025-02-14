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
import { GetModelsResponse } from "@/domains/models/models/getModels.response";
import { useDeleteModelRequest, useUpdateModelRequest } from "@/domains/stores/store";
import { ModelDeleteDialog } from "./delete-dialog";
import { useState } from "react";
import { ModelUpdateDialog } from "./update-dialog";


export const columns: ColumnDef<GetModelsResponse>[] = [
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
        accessorKey: "releaseDate",
        header: "Release Date",
    },
    {
        accessorKey: "manufacturerId",
        header: "Manufacturer Id",
    },

    {
        id: "actions",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { setId, setName, setManufacturerId, setReleaseDate } = useUpdateModelRequest();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const deleteModel = useDeleteModelRequest();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [IsDeleteOpen, SetIsDeleteOpen] = useState(false);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [IsUpdateOpen, SetIsUpdateOpen] = useState(false);
            // // eslint-disable-next-line react-hooks/rules-of-hooks
            // // eslint-disable-next-line react-hooks/rules-of-hooks
            const openDeleteDialog = () => SetIsDeleteOpen(true);  // Open dialog
            const closeDeleteDialog = () => SetIsDeleteOpen(false);  // Close dialog
            const openUpdateDialog = () => SetIsUpdateOpen(true);
            const closeUpdateDialog = () => SetIsUpdateOpen(false);
            const currentid = row.getValue("id") as string;
            const currentName = row.getValue("name") as string;
            const currentManufacturerId = row.getValue("manufacturerId") as string;
            const currentReleaseDate = new Date(row.getValue("releaseDate"));

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
                            setId(currentid)
                            setManufacturerId(currentManufacturerId)
                            setName(currentName)
                            setReleaseDate(currentReleaseDate)
                            openUpdateDialog();
                        }} >
                            <h2>Cập nhật</h2>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            deleteModel.setId(currentid);
                            openDeleteDialog();
                        }} >
                            <h2>Xóa</h2>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
                    <ModelDeleteDialog isOpen={IsDeleteOpen} onClose={closeDeleteDialog} />
                    <ModelUpdateDialog isOpen={IsUpdateOpen} onClose={closeUpdateDialog} />
                </>
            );
        },
    },
];