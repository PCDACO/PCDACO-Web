"use client"

import { useGetFuelTypesRequest, useGetFuelTypesResponses } from "@/domains/stores/store";
import { DataTable } from "@/components/fuel-types/data-table";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { formatDate } from "@/lib/utils";
import { FuelTypesApi } from "@/domains/services/fuel-types/fuelTypes.service";
import { GetFuelTypesResponse, GetFuelTypesResponses } from "@/domains/models/fuel-types/getFuelTypes.response";
import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";

export default function FuelTypesTable({ columns }: { columns: ColumnDef<GetFuelTypesResponse>[] }) {
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

    const debouncedKeyword = useDebounce(keyword, 500); // 500ms debounce delay

    const { isPending, refetch } = useQuery({
        queryKey: ["fuel-types", index, size],
        queryFn: () =>
            FuelTypesApi.getFuelTypes(index, size, debouncedKeyword).then((res) => {
                const fuelTypes = res as SharedResponse<GetFuelTypesResponses>;
                setItems(fuelTypes.value!.items);
                setHasNext(fuelTypes.value!.hasNext);
                setPageNumber(fuelTypes.value!.pageNumber);
                setPageSize(fuelTypes.value!.pageSize);
                setTotalItems(fuelTypes.value!.totalItems);
                setRefetch(refetch);
            })
    });

    useEffect(() => {
        if (index === 1) refetch();
        else setIndex(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedKeyword])

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