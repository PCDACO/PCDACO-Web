import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useParamStore } from "@/stores/store";

interface IPaginationTable<T> {
  value: Pagination<T>;
}

const PaginationTable = <T,>({ value }: IPaginationTable<T>) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const { setValue, value: params } = useParamStore();

  React.useEffect(() => {
    setValue({
      ...params,
      index: pageNumber,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <PaginationPrevious
            href="#"
            onClick={() =>
              setPageNumber((prev) => Math.max(prev - 1, 1))
            }
          />
        </PaginationItem>

        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={() => setPageNumber(page)}
              className={page === pageNumber ? "bg-primary text-white" : undefined}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, totalPages))
            }
          />
        </PaginationItem>
      </PaginationContent>
      {/* <Select onValueChange={(value) => handlePageSizeChange(Number(value))}> */}
      {/*   <SelectTrigger className="w-[150px]"> */}
      {/*     <SelectValue placeholder="Số Lượng" /> */}
      {/*   </SelectTrigger> */}
      {/*   <SelectContent> */}
      {/*     <SelectGroup> */}
      {/*       <SelectLabel>Size page</SelectLabel> */}
      {/*       {["10", "20", "50", "100"].map((item) => ( */}
      {/*         <SelectItem value={item} key={item}> */}
      {/*           {item} */}
      {/*         </SelectItem> */}
      {/*       ))} */}
      {/*     </SelectGroup> */}
      {/*   </SelectContent> */}
      {/* </Select> */}
    </Pagination>
  );
};

export default PaginationTable;
