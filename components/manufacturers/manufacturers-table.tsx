"use client"

import { useGetManufacturersRequest, useGetManufacturersResponses } from "@/domains/stores/store";
import { DataTable } from "@/components/manufacturers/data-table";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { GetManufacturersResponse, GetManufacturersResponses } from "@/domains/models/manufacturers/getManufacturers.response";
import { GetManufacturers } from "@/app/(dashboard)/manufacturers/action";

export default function ManufacturersTable({
    columns,
    data
}: {
    columns: ColumnDef<GetManufacturersResponse>[],
    data: GetManufacturersResponses
}) {
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

    const [isLoaded, setIsLoaded] = useState(false);
    const debouncedKeyword = useDebounce(keyword, 500); // 500ms debounce delay

    const { isPending, refetch } = useQuery({
        queryKey: ["manufacturers", index],
        queryFn: () =>
            GetManufacturers({
                index: index,
                size: size,
                keyword: debouncedKeyword
            }).then((res) => {
                const carDatas = res as SharedResponse<GetManufacturersResponses>;
                setItems(carDatas.value!.items);
                setHasNext(carDatas.value!.hasNext);
                setPageNumber(carDatas.value!.pageNumber);
                setPageSize(carDatas.value!.pageSize);
                setTotalItems(carDatas.value!.totalItems);
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
        if (isLoaded) {
            refetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, debouncedKeyword]);

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