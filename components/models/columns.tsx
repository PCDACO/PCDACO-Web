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
        id: "actions",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cell: ({ row }) => {
            // // eslint-disable-next-line react-hooks/rules-of-hooks
            // const [IsDeleteOpen, SetIsDeleteOpen] = useState(false);
            // // eslint-disable-next-line react-hooks/rules-of-hooks
            // const [IsUpdateOpen, SetIsUpdateOpen] = useState(false);
            // // eslint-disable-next-line react-hooks/rules-of-hooks
            // const updateAmenityRequest = useUpdateManufacturerRequest();
            // // eslint-disable-next-line react-hooks/rules-of-hooks
            // const deleteRequest = useDeleteManufacturerRequest();
            // const data = row.original;
            // const openDeleteDialog = () => SetIsDeleteOpen(true);  // Open dialog
            // const closeDeleteDialog = () => SetIsDeleteOpen(false);  // Close dialog
            // const openUpdateDialog = () => SetIsUpdateOpen(true);
            // const closeUpdateDialog = () => SetIsUpdateOpen(false);

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
                            // updateAmenityRequest.setId(data.id);
                            // updateAmenityRequest.setName(data.name);
                            // openUpdateDialog();
                        }} >
                            <h2>Cập nhật</h2>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            // deleteRequest.setId(data.id);
                            // openDeleteDialog();
                        }} >
                            <h2>Xóa</h2>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
                    {/* <ManufacturerDeleteDialog isOpen={IsDeleteOpen} onClose={closeDeleteDialog} />
                    <ManufacturerUpdateDialog isOpen={IsUpdateOpen} onClose={closeUpdateDialog} /> */}
                </>
            );
        },
    },
];