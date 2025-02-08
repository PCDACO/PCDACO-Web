'use client'

import { SharedResponse } from "@/domains/models/shared/shared.response";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useGetCarStatusResponse, useGetCompensationStatusesRequest} from "@/domains/stores/store";
import { GetCompensationStatuses } from "@/app/(dashboard)/compensation-statuses/action";
import { GetCarStatusesResponse, GetCarStatusesResponses } from "@/domains/models/car-statuses/getCarStatuses.response";

export default function CarStatusesTable({ columns, data }: {
    columns: ColumnDef<GetCarStatusesResponse>[],
    data: GetCarStatusesResponses
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
            const response = await GetCompensationStatuses({ index, size, keyword: debouncedKeyword });
            if (response.isSuccess) {
                const data = response as SharedResponse<GetCarStatusesResponses>;
                setItems(data.value!.items);
                setHasNext(data.value!.hasNext);
                setPageNumber(data.value!.pageNumber);
                setPageSize(data.value!.pageSize);
                setTotalItems(data.value!.totalItems);
            }
        },
        enabled: false,
        initialData: () => {
            setItems(data.items);
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