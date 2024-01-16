import { render, fireEvent } from "@testing-library/react";
import { PaginationComponent } from "@/components/Pagination";

describe("PaginationComponent", () => {
  const mockPages = [1, 2, 3, 4, 5];
  const mockCurrentPage = 1;
  const mockHandlePrevClick = jest.fn();
  const mockHandleNextClick = jest.fn();
  const mockHandlePageClick = jest.fn();
  const mockStartPage = 1;

  it("renders the PaginationComponent correctly", () => {
    const { container } = render(
      <PaginationComponent
        pages={mockPages}
        currentPage={mockCurrentPage}
        handlePrevClick={mockHandlePrevClick}
        handleNextClick={mockHandleNextClick}
        handlePageClick={mockHandlePageClick}
        startPage={mockStartPage}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("calls handlePrevClick on clicking Previous button", () => {
    const { getByText } = render(
      <PaginationComponent
        pages={mockPages}
        currentPage={mockCurrentPage}
        handlePrevClick={mockHandlePrevClick}
        handleNextClick={mockHandleNextClick}
        handlePageClick={mockHandlePageClick}
        startPage={mockStartPage}
      />
    );

    fireEvent.click(getByText("Previous"));

    expect(mockHandlePrevClick).toHaveBeenCalled();
  });

  it("calls handleNextClick on clicking Next button", () => {
    const { getByText } = render(
      <PaginationComponent
        pages={mockPages}
        currentPage={mockCurrentPage}
        handlePrevClick={mockHandlePrevClick}
        handleNextClick={mockHandleNextClick}
        handlePageClick={mockHandlePageClick}
        startPage={mockStartPage}
      />
    );

    fireEvent.click(getByText("Next"));

    expect(mockHandleNextClick).toHaveBeenCalled();
  });

  it("calls handlePageClick with the correct page number", () => {
    const { getByText } = render(
      <PaginationComponent
        pages={mockPages}
        currentPage={mockCurrentPage}
        handlePrevClick={mockHandlePrevClick}
        handleNextClick={mockHandleNextClick}
        handlePageClick={mockHandlePageClick}
        startPage={mockStartPage}
      />
    );

    fireEvent.click(getByText("2")); // Assuming there is a '2' in the pagination

    expect(mockHandlePageClick).toHaveBeenCalledWith(2);
  });
});
