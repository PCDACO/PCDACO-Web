"use client"
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { useParamStore } from "@/stores/store";
import { Button } from "../ui/button";

interface IPaginationTable<T> {
  value: Pagination<T>;
}

const PaginationTable = <T,>({ value }: IPaginationTable<T>) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { setValue, value: params } = useParamStore();

  React.useEffect(() => {
    setValue({
      ...params,
      index: pageNumber,
    });
    // eslint-disable-next-line 
  }, [pageNumber]);

  const totalPages = Math.ceil(value.totalItems / 10);

  const getPageNumbers = () => {
    const pagesToShow = 5;
    const currentPage = pageNumber;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages <= pagesToShow) {
      // less than or equal to the maximum number of pages to show
      endPage = totalPages;
    } else {
      // more than the maximum number of pages to show
      const middle = Math.ceil(pagesToShow / 2);
      if (currentPage <= middle) {
        startPage = 1;
        endPage = pagesToShow;
      } else if (currentPage + middle - 1 >= totalPages) {
        startPage = totalPages - pagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middle + 1;
        endPage = currentPage + middle - 1;
      }
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            className="hover:cursor-pointer bg-white text-black "
            onClick={() =>
              setPageNumber((prev) => Math.max(prev - 1, 1))
            } >
            {"<"}
          </Button>
        </PaginationItem>

        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <Button
              onClick={() => setPageNumber(page)}
              className={page === pageNumber ? "bg-primary text-white" : "bg-white text-black"}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            variant="outline"
            className="hover:cursor-pointer bg-white text-black"
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, totalPages))
            } >
            {">"}
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination >
  );
};

export default PaginationTable;
