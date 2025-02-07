"use client";

import { useEffect, useState } from "react";
import { ModelsDataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetModelsRequest, useGetModelsResponses } from "@/domains/stores/store";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { GetModelsResponse, GetModelsResponses } from "@/domains/models/models/getModels.response";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { GetModels } from "@/app/(dashboard)/manufacturers/[id]/models/action";

export default function ModelsTable({ id, columns, data }: { id: string, columns: ColumnDef<GetModelsResponse>[], data: GetModelsResponses }) {
    const { index, size, keyword, setIndex, setKeyword, setRefetch } = useGetModelsRequest();
    const {
        items,
        hasNext,
        setItems,
        setHasNext,
        setPageNumber,
        setPageSize,
        setTotalItems
    } = useGetModelsResponses();
    const debouncedKeyword = useDebounce(keyword, 500); // 500ms debounce delay
    const [isLoaded, setIsLoaded] = useState(false);
    const { isPending, refetch } = useQuery({
        queryKey: ["models", index, size, id],
        queryFn: () =>
            GetModels({ index, size, keyword: debouncedKeyword, manufacturerId: id }).then((res) => {
                const modelDatas = res as SharedResponse<GetModelsResponses>;
                setItems(modelDatas.value!.items);
                setHasNext(modelDatas.value!.hasNext);
                setPageNumber(modelDatas.value!.pageNumber);
                setPageSize(modelDatas.value!.pageSize);
                setTotalItems(modelDatas.value!.totalItems);
            }),
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
            <ModelsDataTable
                columns={columns}
                data={items?.map((item) => {
                    return {
                        ...item,
                        createdAt: formatDate(item.createdAt)
                    }
                }) ?? []}
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