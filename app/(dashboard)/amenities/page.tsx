"use client";

import { useGetAmenitiesRequest, useGetAmenitiesResponses } from "@/domains/stores/store";
import { DataTable } from "@/components/amenities/data-table";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { formatDate } from "@/lib/utils";
import { columns } from "@/components/amenities/columns";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { GetAmenitiesResponses } from "@/domains/models/amenities/getamenities.response";
import { useEffect } from "react";
import { AmenitiyApi } from "@/domains/services/amenities/amenities.service";

export default function AmenitiesPage() {
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
        }
    });
    useEffect(() => {
        if (index === 1) {
            refetch();
        }
        setIndex(1);
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
