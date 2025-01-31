"use client";

import { useGetCarsRequest, useGetCarsResponses } from "@/domains/stores/store";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { CarApi } from "@/domains/services/cars/car.service";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { GetCarsResponses } from "@/domains/models/cars/getcars.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { useDebounce } from "@/hooks/use-debounce";

export default function CarPage() {
    const { index, size, keyword, setIndex, setKeyword } = useGetCarsRequest();
    const {
        items,
        hasNext,
        setItems,
        setHasNext,
        setPageNumber,
        setPageSize,
        setTotalItems
    } = useGetCarsResponses();

    const debouncedKeyword = useDebounce(keyword, 500); // 500ms debounce delay

    const { data, isPending, isSuccess } = useQuery({
        queryKey: ["cars", index, size, debouncedKeyword],
        queryFn: () =>
            CarApi.getCarForAdmin(index, size, debouncedKeyword)
    });

    useEffect(() => {
        if (isSuccess) {
            const carDatas = data as SharedResponse<GetCarsResponses>;
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
