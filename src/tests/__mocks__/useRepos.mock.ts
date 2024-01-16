// __mocks__/useReposData.ts

import { SEARCH_MOCK } from "./search.mock";

export const useRepositoryDataMock = {
  loading: false,
  error: undefined,
  data: SEARCH_MOCK,
  headProps: {
    handleSubmit: jest.fn(),
    handleInputChange: jest.fn(),
    searchInput: "mockSearchInput",
    topic: "topic:mock",
    totalRepos: 42,
  },
  paginationProps: {
    pages: [1, 2, 3],
    currentPage: 1,
    totalPages: 3,
    handlePrevClick: jest.fn(),
    handleNextClick: jest.fn(),
    handlePageClick: jest.fn(),
    startPage: 1,
  },
  noRepos: false,
};

export const useRepositoryData = jest.fn(() => useRepositoryDataMock);
