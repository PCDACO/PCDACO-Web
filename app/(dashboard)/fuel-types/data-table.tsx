"use client"

import { Button } from "@/components/ui/button"


import {
    ColumnDef,
    ColumnFiltersState,
    getFilteredRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import React from "react"
import { FuelTypeDialog } from "./dialog"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    index: number,
    isPending: boolean,
    hasNext: boolean
    keyword: string
    setIndex: (index: number) => void
    setKeyword: (keyword: string) => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    index,
    isPending,
    hasNext,
    keyword,
    setIndex,
    setKeyword
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    })

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between space-x-4 py-4 w-full">
                <Input
                    placeholder="Search name"
                    value={keyword || ""}
                    onChange={(event) => setKeyword(event.target.value)}
                    className="max-w-sm"
                />
                <FuelTypeDialog />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {
                                        isPending && (
                                            <div className="flex justify-center items-center space-x-2 animate-pulse">
                                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                                            </div>)
                                    }
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="default"
                    onClick={() => setIndex(index - 1)}
                    disabled={index === 1}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="default"
                    onClick={() => setIndex(index + 1)}
                    disabled={!hasNext}
                >
                    Next
                </Button>
            </div>
        </div>

    )
}
