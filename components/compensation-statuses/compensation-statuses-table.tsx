'use client'

import { SharedResponse } from "@/domains/models/shared/shared.response";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { DataTable } from "./data-table";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { GetCompensationStatusesResponse, GetCompensationStatusesResponses } from "@/domains/models/compensation-statuses/getCompensationStatuses.response";
import { useGetCompensationStatusesRequest, useGetCompensationStatusesResponses } from "@/domains/stores/store";
import { CompensationStatusesApi } from "@/domains/services/compensation-statuses/compensation-statuses.request";

export default function CompensationStatusesTable({ columns }: { columns: ColumnDef<GetCompensationStatusesResponse>[] }) {
    const { index, size, keyword, setRefetch, setIndex, setKeyword } = useGetCompensationStatusesRequest();
    const {
        items,
        hasNext,
        setItems,
        setHasNext,
        setPageNumber,
        setPageSize,
        setTotalItems
    } = useGetCompensationStatusesResponses();

    const debouncedKeyword: string = useDebounce(keyword, 500); // 500ms debounce delay

    const { isPending, refetch } = useQuery({
        queryKey: ["compensation-statuses", index],
        queryFn: async () => {
            const response = await CompensationStatusesApi.getCompensationStatuses({ index, size, keyword: debouncedKeyword });
            if (response.isSuccess) {
                const data = response as SharedResponse<GetCompensationStatusesResponses>;
                setItems(data.value!.items);
                setHasNext(data.value!.hasNext);
                setPageNumber(data.value!.pageNumber);
                setPageSize(data.value!.pageSize);
                setTotalItems(data.value!.totalItems);
                setRefetch(refetch)
            }
        }
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