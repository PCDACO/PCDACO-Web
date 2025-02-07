'use client'

import { GetAmenitiesResponseRendered, GetAmenitiesResponses } from "@/domains/models/amenities/getamenities.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { AmenitiyApi } from "@/domains/services/amenities/amenities.service";
import { useGetAmenitiesRequest, useGetAmenitiesResponses } from "@/domains/stores/store";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { DataTable } from "./data-table";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export default function AmenitiesTable({ columns }: { columns: ColumnDef<GetAmenitiesResponseRendered>[] }) {
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

    const transformedData: GetAmenitiesResponseRendered[] = items?.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        icon: <Image src={item.iconUrl} alt={`${item.name} icon`} width={25} height={25} />, // Convert to ReactElement
        createdAt: formatDate(item.createdAt),
    })) ?? [];

    const debouncedKeyword: string = useDebounce(keyword, 500); // 500ms debounce delay

    const { isPending, refetch } = useQuery({
        queryKey: ["amenities", index],
        queryFn: async () => {
            const response = await AmenitiyApi.getAmenities(index, size, debouncedKeyword);
            if (response.isSuccess) {
                const data = response as SharedResponse<GetAmenitiesResponses>;
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
                data={transformedData}
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