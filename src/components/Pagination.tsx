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
  //disabled={currentPage === 1}

  console.log(currentPage, "currentPage");
  console.log(pages, 'pages')

  return (
    <Pagination className="my-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrevClick} />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem onClick={() => handlePageClick(page)}>
            <PaginationLink
              className={
                currentPage == startPage + page - 1 ? "bg-white text-black" : ""
              }
              href="#"
            >
              {startPage + page - 1}
            </PaginationLink>{" "}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={handleNextClick} href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
