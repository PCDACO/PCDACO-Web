"use client"

import { useGetManufacturersRequest, useGetManufacturersResponses } from "@/domains/stores/store";
import { DataTable } from "@/components/manufacturers/data-table";
import { useQuery } from "@tanstack/react-query";
import { ManufacturerApi } from "@/domains/services/manufacturers/manufacturer.service";
import { useDebounce } from "@/hooks/use-debounce";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { formatDate } from "@/lib/utils";
import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { GetManufacturersResponse, GetManufacturersResponses } from "@/domains/models/manufacturers/getManufacturers.response";

export default function ManufacturersTable({
    columns
}: { columns: ColumnDef<GetManufacturersResponse>[] }) {
    const { index, size, keyword, setIndex, setKeyword, setRefetch } = useGetManufacturersRequest();
    const {
        items,
        hasNext,
        setItems,
        setHasNext,
        setPageNumber,
        setPageSize,
        setTotalItems
    } = useGetManufacturersResponses();

    const debouncedKeyword = useDebounce(keyword, 500); // 500ms debounce delay

    const { isPending, refetch } = useQuery({
        queryKey: ["manufacturers", index, size],
        queryFn: () =>
            ManufacturerApi.getManufacturers(index, size, debouncedKeyword).then((res) => {
                const carDatas = res as SharedResponse<GetManufacturersResponses>;
                setItems(carDatas.value!.items);
                setHasNext(carDatas.value!.hasNext);
                setPageNumber(carDatas.value!.pageNumber);
                setPageSize(carDatas.value!.pageSize);
                setTotalItems(carDatas.value!.totalItems);
                setRefetch(refetch);
            })
    });

    useEffect(() => {
        if (index === 1) refetch();
        else setIndex(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedKeyword]);

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