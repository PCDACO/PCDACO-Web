"use client";

import { useGetManufacturersRequest, useGetManufacturersResponses } from "@/domains/stores/store";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { ManufacturerApi } from "@/domains/services/manufacturer.service.ts/manufacturer.service";
import { useDebounce } from "@/hooks/use-debounce";
import { GetAmenitiesResponses } from "@/domains/models/amenities/getamenities.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { formatDate } from "@/lib/utils";

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

    const { isPending, isSuccess } = useQuery({
        queryKey: ["amenities", index, size, debouncedKeyword],
        queryFn: () =>
            ManufacturerApi.getManufacturers(index, size, debouncedKeyword).then((res) => {
                const carDatas = res as SharedResponse<GetAmenitiesResponses>;
                setItems(carDatas.value!.items);
                setHasNext(carDatas.value!.hasNext);
                setPageNumber(carDatas.value!.pageNumber);
                setPageSize(carDatas.value!.pageSize);
                setTotalItems(carDatas.value!.totalItems);
            })
    });
    console.log("isSuccess", isSuccess);

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
