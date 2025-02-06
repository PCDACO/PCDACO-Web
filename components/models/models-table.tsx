"use client";

import { useEffect } from "react";
import { ModelsDataTable } from "./data-table";
import { ModelsApi } from "@/domains/services/models/models.service";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetModelsRequest, useGetModelsResponses } from "@/domains/stores/store";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { GetModelsResponse, GetModelsResponses } from "@/domains/models/models/getModels.response";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export default function ModelsTable({ id,columns }: { id: string,columns:ColumnDef<GetModelsResponse>[] }) {
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
    console.log("id : " + id);
    const { isPending, refetch } = useQuery({
        queryKey: ["models", index, size],
        queryFn: () =>
            ModelsApi.getModels(index, size, debouncedKeyword, id).then((res) => {
                const modelDatas = res as SharedResponse<GetModelsResponses>;
                setItems(modelDatas.value!.items);
                setHasNext(modelDatas.value!.hasNext);
                setPageNumber(modelDatas.value!.pageNumber);
                setPageSize(modelDatas.value!.pageSize);
                setTotalItems(modelDatas.value!.totalItems);
                setRefetch(refetch);
            })
    });

    useEffect(() => {
        if (index === 1) refetch();
        else setIndex(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedKeyword]);

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