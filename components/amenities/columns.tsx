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
import { GetAmenitiesResponseRendered } from "@/domains/models/amenities/getamenities.response";
import { useState } from "react";
import { AmenityDeleteDialog } from "@/components/amenities/delete-dialog";
import { AmenityUpdateDialog } from "@/components/amenities/update-dialog";
import {
  useDeleteAmenityRequest,
  useGetAmenitiesResponses,
  useUpdateAmenityRequest,
} from "@/domains/stores/store";
import { urlToFileList } from "@/lib/urlToFile";

export const columns: ColumnDef<GetAmenitiesResponseRendered>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => row.original.icon, // Render the icon correctly
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [IsUpdateOpen, SetIsUpdateOpen] = useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setId, setDescription, setName, setIcon } = useUpdateAmenityRequest();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const deleteRequest = useDeleteAmenityRequest();
      const currentid = row.getValue("id") as string;
      const currentname = row.getValue("name") as string;
      const currentdescription = row.getValue("description") as string;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { items } = useGetAmenitiesResponses();
      let currenticon: FileList;
      urlToFileList(items.find((item) => item.id === currentid)?.iconUrl as string, "icon").then((res) => {
        currenticon = res;
      });
      const openDeleteDialog = () => SetIsDeleteOpen(true); // Open dialog
      const closeDeleteDialog = () => SetIsDeleteOpen(false); // Close dialog
      const openUpdateDialog = () => SetIsUpdateOpen(true);
      const closeUpdateDialog = () => SetIsUpdateOpen(false);

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
              <DropdownMenuItem
                onClick={() => {
                  setId(currentid);
                  setName(currentname);
                  setDescription(currentdescription);
                  setIcon(currenticon);
                  openUpdateDialog();
                }}
              >
                <h2>Cập nhật</h2>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  deleteRequest.setId(currentid);
                  openDeleteDialog();
                }}
              >
                <h2>Xóa</h2>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AmenityDeleteDialog
            isOpen={IsDeleteOpen}
            onClose={closeDeleteDialog}
          />
          <AmenityUpdateDialog
            isOpen={IsUpdateOpen}
            onClose={closeUpdateDialog}
          />
        </>
      );
    },
  },
];
