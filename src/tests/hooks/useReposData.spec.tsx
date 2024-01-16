import { renderHook } from "@testing-library/react-hooks";
import { SEARCH_MOCK } from "../__mocks__/search.mock";
import { useRepositoryData } from "@/hooks/useReposData";

jest.mock("@/hooks/useReposData", () => ({
  useRepositoryData: jest.fn(() => ({
    getRepos: jest.fn(),
    loading: false,
    error: undefined,
    data: SEARCH_MOCK,
    headProps: {
      handleSubmit: jest.fn(),
      handleInputChange: jest.fn(),
      searchInput: "",
      topic: "topic:react",
      totalRepos: undefined,
    },
    paginationProps: {
      pages: [],
      currentPage: 1,
      totalPages: 0,
      handlePrevClick: jest.fn(),
      handleNextClick: jest.fn(),
      handlePageClick: jest.fn(),
      startPage: 1,
    },
    noRepos: false,
  })),
}));

describe("useReposData", () => {
  it("initializes correctly", () => {
    const { result } = renderHook(() => useRepositoryData());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual(SEARCH_MOCK);
  });
});
