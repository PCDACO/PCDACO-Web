"use client"

import { useGetCarsRequest, useGetCarsResponses } from "@/domains/stores/store";
import { DataTable } from "@/components/cars/data-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetCarsResponse, GetCarsResponses } from "@/domains/models/cars/getcars.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { useDebounce } from "@/hooks/use-debounce";
import { ColumnDef } from "@tanstack/react-table";
import { GetCars } from "@/app/(dashboard)/cars/action";

export default function CarTable({
    columns,
    data
}: {
    columns: ColumnDef<GetCarsResponse>[],
    data: GetCarsResponses
}) {
    const { index, size, keyword, setIndex, setKeyword,setRefetch } = useGetCarsRequest();
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
    const [isLoaded, setIsLoaded] = useState(false);
    const { isPending, refetch } = useQuery({
        queryKey: ["cars", index, size, debouncedKeyword],
        queryFn: () =>
            GetCars({ index, size, keyword: debouncedKeyword }).then((res) => {
                const carDatas = res as SharedResponse<GetCarsResponses>;
                setItems(carDatas.value!.items);
                setHasNext(carDatas.value!.hasNext);
                setPageNumber(carDatas.value!.pageNumber);
                setPageSize(carDatas.value!.pageSize);
                setTotalItems(carDatas.value!.totalItems);
            }),
        enabled: false,
        initialData: () => {
            setItems(data.items);
            setHasNext(data.hasNext);
            setPageNumber(data.pageNumber);
            setPageSize(data.pageSize);
            setTotalItems(data.totalItems);
            setTimeout(() => setIsLoaded(true), 500);
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