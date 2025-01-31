"use client";

import { useGetManufacturersRequest, useGetManufacturersResponses } from "@/domains/stores/store";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ManufacturerApi } from "@/domains/services/manufacturer.service.ts/manufacturer.service";
import { useDebounce } from "@/hooks/use-debounce";
import { GetAmenitiesResponses } from "@/domains/models/amenities/getamenities.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export default function CarPage() {
    const { index, size, keyword, setIndex, setKeyword } = useGetManufacturersRequest();
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

    const { data, isPending, isSuccess } = useQuery({
        queryKey: ["amenities", index, size, debouncedKeyword],
        queryFn: () =>
            ManufacturerApi.getManufacturers(index, size, debouncedKeyword)
    });

    useEffect(() => {
        if (isSuccess) {
            const carDatas = data as SharedResponse<GetAmenitiesResponses>;
            toast({ title: carDatas.message });
            setItems(carDatas.value!.items);
            setHasNext(carDatas.value!.hasNext);
            setPageNumber(carDatas.value!.pageNumber);
            setPageSize(carDatas.value!.pageSize);
            setTotalItems(carDatas.value!.totalItems);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (
        <div className="container py-10">
            <DataTable
                columns={columns}
                data={isPending ? [] : items}
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
