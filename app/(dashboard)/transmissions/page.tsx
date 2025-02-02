"use client";

import { useGetTransmissionsRequest, useGetTransmissionsResponses } from "@/domains/stores/store";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { formatDate } from "@/lib/utils";
import { TransmissionApi } from "@/domains/services/transmissions/transmissions.service";
import { GetTransmissionsResponses } from "@/domains/models/transmissions/getTransmissions.response";

export default function CarPage() {
    const { index, size, keyword, setIndex, setKeyword } = useGetTransmissionsRequest();
    const {
        items,
        hasNext,
        setItems,
        setHasNext,
        setPageNumber,
        setPageSize,
        setTotalItems
    } = useGetTransmissionsResponses();

    const debouncedKeyword = useDebounce(keyword, 500); // 500ms debounce delay

    const { isPending } = useQuery({
        queryKey: ["transmissions", index, size, debouncedKeyword],
        queryFn: () =>
            TransmissionApi.getTransmissions(index, size, debouncedKeyword).then((res) => {
                const fuelTypes = res as SharedResponse<GetTransmissionsResponses>;
                setItems(fuelTypes.value!.items);
                setHasNext(fuelTypes.value!.hasNext);
                setPageNumber(fuelTypes.value!.pageNumber);
                setPageSize(fuelTypes.value!.pageSize);
                setTotalItems(fuelTypes.value!.totalItems);
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
