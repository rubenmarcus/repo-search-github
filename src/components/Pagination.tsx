import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationProps } from "@/types/types";

export const PaginationComponent = ({
  pages,
  currentPage,
  handlePrevClick,
  handleNextClick,
  handlePageClick,
  startPage,
}: PaginationProps) => {
  return (
    <Pagination className="my-5">
      <PaginationContent>
        <PaginationPrevious href="#" onClick={handlePrevClick} />

        {pages.map((page) => (
          <PaginationLink
            key={startPage + page - 1}
            onClick={() => handlePageClick(page)}
            className={
              currentPage == startPage + page - 1 ? "bg-white text-black" : ""
            }
            href="#"
          >
            {startPage + page - 1}
          </PaginationLink>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationNext onClick={handleNextClick} href="#" />
      </PaginationContent>
    </Pagination>
  );
};
