"use client";

import { useGetAmenitiesRequest, useGetAmenitiesResponses } from "@/domains/stores/store";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { AmenitiyApi } from "@/domains/services/amenities/amenities.service";
import { GetAmenitiesResponses } from "@/domains/models/amenities/getamenities.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { useDebounce } from "@/hooks/use-debounce";
import { formatDate } from "@/lib/utils";
import { columns } from "./columns";

export default function AmenitiesPage() {
    const { index, size, keyword, setIndex, setKeyword } = useGetAmenitiesRequest();
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

    const { isPending } = useQuery({
        queryKey: ["amenities", index, size, debouncedKeyword],
        queryFn: () =>
            AmenitiyApi.getAmenities(index, size, debouncedKeyword).then((res) => {
                const carDatas = res as SharedResponse<GetAmenitiesResponses>;
                setItems(carDatas.value!.items);
                setHasNext(carDatas.value!.hasNext);
                setPageNumber(carDatas.value!.pageNumber);
                setPageSize(carDatas.value!.pageSize);
                setTotalItems(carDatas.value!.totalItems);
            })
    });
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
