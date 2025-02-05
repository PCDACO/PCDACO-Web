'use client'

import { columns } from "@/components/amenities/columns";
import { DataTable } from "@/components/amenities/data-table";
import { GetAmenitiesResponses } from "@/domains/models/amenities/getamenities.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { AmenitiyApi } from "@/domains/services/amenities/amenities.service";
import { useGetAmenitiesRequest, useGetAmenitiesResponses } from "@/domains/stores/store";
import { useDebounce } from "@/hooks/use-debounce";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Table({
    data
}: { data: SharedResponse<GetAmenitiesResponses> }) {
    const { index, size, keyword, setRefetch, setIndex, setKeyword } = useGetAmenitiesRequest();
    const {
        items,
        hasNext,
        setItems,
        setHasNext,
        setPageNumber,
        setPageSize,
        setTotalItems
    } = useGetAmenitiesResponses();
    const debouncedKeyword = useDebounce(keyword, 500); // 500ms debounce delay

    const { isPending, refetch } = useQuery({
        queryKey: ["amenities", size, index],
        queryFn: async () => {
            const response = await AmenitiyApi.getAmenities(index, size, debouncedKeyword);
            const data = response as SharedResponse<GetAmenitiesResponses>;
            setItems(data.value!.items);
            setHasNext(data.value!.hasNext);
            setPageNumber(data.value!.pageNumber);
            setPageSize(data.value!.pageSize);
            setTotalItems(data.value!.totalItems);
            setRefetch(refetch)
        },
        initialData: () => {
            setItems(data.value!.items);
            setHasNext(data.value!.hasNext);
            setPageNumber(data.value!.pageNumber);
            setPageSize(data.value!.pageSize);
            setTotalItems(data.value!.totalItems);
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