"use client"

import { useGetFuelTypesRequest, useGetFuelTypesResponses } from "@/domains/stores/store";
import { DataTable } from "@/components/fuel-types/data-table";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { formatDate } from "@/lib/utils";
import { GetFuelTypesResponse, GetFuelTypesResponses } from "@/domains/models/fuel-types/getFuelTypes.response";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { GetFuelTypes } from "@/app/(dashboard)/fuel-types/action";

export default function FuelTypesTable({ columns, data }: { columns: ColumnDef<GetFuelTypesResponse>[], data: GetFuelTypesResponses }) {
    const { index, size, keyword, setIndex, setKeyword, setRefetch } = useGetFuelTypesRequest();
    const {
        items,
        hasNext,
        setItems,
        setHasNext,
        setPageNumber,
        setPageSize,
        setTotalItems
    } = useGetFuelTypesResponses();
    const [isLoaded, setIsLoaded] = useState(false);

    const debouncedKeyword = useDebounce(keyword, 500); // 500ms debounce delay

    const { isPending, refetch } = useQuery({
        queryKey: ["fuel-types", index],
        queryFn: () =>
            GetFuelTypes({
                index, size, keyword: debouncedKeyword
            }).then((res) => {
                const fuelTypes = res as SharedResponse<GetFuelTypesResponses>;
                setItems(fuelTypes.value!.items);
                setHasNext(fuelTypes.value!.hasNext);
                setPageNumber(fuelTypes.value!.pageNumber);
                setPageSize(fuelTypes.value!.pageSize);
                setTotalItems(fuelTypes.value!.totalItems);
                setRefetch(refetch);
            }),
        enabled: false,
        initialData: () => {
            setItems(data.items);
            setHasNext(data.hasNext);
            setPageNumber(data.pageNumber);
            setPageSize(data.pageSize);
            setTotalItems(data.totalItems);
            setTimeout(() => {
                setIsLoaded(true)
            }, 500);
        }
    });

    useEffect(() => {
        if (isLoaded) refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, debouncedKeyword])

    useEffect(() => {
        setRefetch(refetch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container py-10">
            <DataTable
                columns={columns}
                data={isPending ? [] : (items?.map((item) => {
                    return {
                        ...item,
                        createdAt: formatDate(item.createdAt)
                    }
                }) ?? [])}
                hasNext={hasNext}
                index={index}
                isPending={isPending}
                keyword={keyword}
                setIndex={setIndex}
                setKeyword={setKeyword}
            />
        </div>
    );
}