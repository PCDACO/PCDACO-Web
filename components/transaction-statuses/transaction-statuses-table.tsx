'use client'

import { SharedResponse } from "@/domains/models/shared/shared.response";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useGetCarStatusResponse, useGetCompensationStatusesRequest } from "@/domains/stores/store";
import { DataTable } from "./data-table";
import { GetTransactionStatusesResponse, GetTransactionStatusesResponses } from "@/domains/models/transaction-statuses/getTracsactionStatuses.response";
import { GetTransactionStatuses } from "@/app/(dashboard)/transaction-statuses/action";

export default function CarStatusesTable({ columns, data }: {
    columns: ColumnDef<GetTransactionStatusesResponse>[],
    data: GetTransactionStatusesResponses
}) {
    const { index, size, keyword, setRefetch, setIndex, setKeyword } = useGetCompensationStatusesRequest();
    const {
        items,
        hasNext,
        setItems,
        setHasNext,
        setPageNumber,
        setPageSize,
        setTotalItems
    } = useGetCarStatusResponse();

    const [isLoaded, setIsLoaded] = useState(false);
    const debouncedKeyword: string = useDebounce(keyword, 500); // 500ms debounce delay

    const { isPending, refetch } = useQuery({
        queryKey: ["compensation-statuses", index],
        queryFn: async () => {
            const response = await GetTransactionStatuses({ index, size, keyword: debouncedKeyword });
            if (response.isSuccess) {
                const data = response as SharedResponse<GetTransactionStatusesResponses>;
                setItems(data.value!.items);
                setHasNext(data.value!.hasNext);
                setPageNumber(data.value!.pageNumber);
                setPageSize(data.value!.pageSize);
                setTotalItems(data.value!.totalItems);
            }
        },
        enabled: false,
        initialData: () => {
            setItems(data.items ?? []);
            setHasNext(data.hasNext);
            setPageNumber(data.pageNumber);
            setPageSize(data.pageSize);
            setTotalItems(data.totalItems);
            setTimeout(() => {
                setIsLoaded(true);
            }, 500)
        }
    });
    useEffect(() => {
        if (isLoaded) refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, debouncedKeyword])

    useEffect(() => {
        setRefetch(refetch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container py-10">
            <DataTable
                columns={columns}
                data={items?.map((item) => {
                    return {
                        ...item,
                        createdAt: formatDate(item.createdAt)
                    }
                }) ?? []}
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