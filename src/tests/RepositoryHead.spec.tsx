import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { RepositoryHead } from "@/components/RepositoryHead";
import { useRepositoryData } from "@/hooks/useReposData";

const mock = {
  searchInput: "mockSearchInput",
  topic: "topic:mock",
  totalRepos: 42,
  handleSubmit: jest.fn(),
  handleInputChange: jest.fn(),
};

jest.mock("@/hooks/useReposData", () => ({
  useRepositoryData: jest.fn(() => ({
    loading: false,
    error: undefined,
    data: { search: { repositoryCount: 42 } }, // Mocking some data for the test
    headProps: {
      handleSubmit: jest.fn(),
      handleInputChange: jest.fn(),
      searchInput: "mockSearchInput",
      topic: "topic:mock",
      totalRepos: 42,
    },
    paginationProps: {
      pages: [1, 2, 3], // Mocking some pages for the test
      currentPage: 1,
      totalPages: 3,
      handlePrevClick: jest.fn(),
      handleNextClick: jest.fn(),
      handlePageClick: jest.fn(),
      startPage: 1,
    },
    noRepos: false,
  })),
}));

describe("RepositoryHead", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/mockTopic"]}>
        <Route path="/:topic">
          <RepositoryHead headProps={mock} />
        </Route>
      </MemoryRouter>
    );

    expect(getByText("Github Repository Search")).toBeInTheDocument();
    expect(
      getByText("Search Github repositories by topic")
    ).toBeInTheDocument();
    expect(getByText("topic:mock")).toBeInTheDocument();
    expect(getByText("Total Repositories: 42")).toBeInTheDocument();
    expect(getByText("Search")).toBeInTheDocument();
  });

  it("calls handleInputChange when input changes", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter initialEntries={["/mockTopic"]}>
        <Route path="/:topic">
          <RepositoryHead headProps={mock} />
        </Route>
      </MemoryRouter>
    );

    const input = getByPlaceholderText("Search by topic...");
    fireEvent.change(input, { target: { value: "newSearchInput" } });

    // Ensure that handleInputChange is called with the correct value
    expect(
      useRepositoryData().headProps.handleInputChange
    ).toHaveBeenCalledWith("newSearchInput");
  });

  it("calls handleSubmit when form is submitted", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/mockTopic"]}>
        <Route path="/:topic">
          <RepositoryHead headProps={mock} />
        </Route>
      </MemoryRouter>
    );

    fireEvent.click(getByText("Search"));

    // Ensure that handleSubmit is called
    expect(useRepositoryData().headProps.handleSubmit).toHaveBeenCalled();
  });
});
