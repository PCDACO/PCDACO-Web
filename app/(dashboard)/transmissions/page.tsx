'use client'

import { useGetTransmissionsRequest, useGetTransmissionsResponses } from "@/domains/stores/store";
import { columns } from "@/components/transmissions/columns";
import { DataTable } from "@/components/transmissions/data-table";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { formatDate } from "@/lib/utils";
import { TransmissionApi } from "@/domains/services/transmissions/transmissions.service";
import { GetTransmissionsResponses } from "@/domains/models/transmissions/getTransmissions.response";
import { useEffect } from "react";

export default function CarPage() {
    const { index, size, keyword, setIndex, setKeyword, setRefetch } = useGetTransmissionsRequest();
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

    const { isPending, refetch } = useQuery({
        queryKey: ["transmissions", index, size],
        queryFn: () =>
            TransmissionApi.getTransmissions(index, size, debouncedKeyword).then((res) => {
                const fuelTypes = res as SharedResponse<GetTransmissionsResponses>;
                setItems(fuelTypes.value!.items);
                setHasNext(fuelTypes.value!.hasNext);
                setPageNumber(fuelTypes.value!.pageNumber);
                setPageSize(fuelTypes.value!.pageSize);
                setTotalItems(fuelTypes.value!.totalItems);
                setRefetch(refetch);
            })
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
