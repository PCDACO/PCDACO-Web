'use client'

import { GetAmenitiesResponseRendered, GetAmenitiesResponses } from "@/domains/models/amenities/getamenities.response";
import { useGetAmenitiesRequest, useGetAmenitiesResponses } from "@/domains/stores/store";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { GetAmenities } from "@/app/(dashboard)/amenities/action";

export default function AmenitiesTable({ columns, data }:
    { columns: ColumnDef<GetAmenitiesResponseRendered>[], data: GetAmenitiesResponses }) {
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

    const [isLoaded, setIsLoaded] = useState(false);

    const transformedData: GetAmenitiesResponseRendered[] = items?.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        // eslint-disable-next-line @next/next/no-img-element
        icon: <img src={item.iconUrl} alt={`${item.name} icon`} width={25} height={25} />, // Convert to ReactElement
        createdAt: formatDate(item.createdAt),
    })) ?? [];

    const debouncedKeyword: string = useDebounce(keyword, 500); // 500ms debounce delay

    const { isFetching, refetch } = useQuery({
        queryKey: ["amenities", index],
        queryFn: () => {
            GetAmenities({ index: index, size: size, keyword: debouncedKeyword }).then((res) => {
                setItems(res.value!.items);
                setHasNext(res.value!.hasNext);
                setPageNumber(res.value!.pageNumber);
                setPageSize(res.value!.pageSize);
                setTotalItems(res.value!.totalItems);
            })
        },
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
    }, [index]);
    useEffect(() => {
        if (isLoaded) {
            setIndex(1)
            refetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedKeyword]);
    useEffect(() => {
        setRefetch(refetch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container py-10">
            <DataTable
                columns={columns}
                data={transformedData}
                hasNext={hasNext}
                index={index}
                isPending={isFetching}
                keyword={keyword}
                setIndex={setIndex}
                setKeyword={setKeyword}
            />
        </div>
    );
}