interface RepositoryData {
  name: string;
  owner: { login: string };
  description: string;
  stargazers: { totalCount: number };
  watchers: { totalCount: number };
  forks: { totalCount: number };
  url: string;
}

interface SearchResponse {
  search: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    edges: { node: RepositoryData }[];
    repositoryCount: number;
  };
}

interface HeadProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchInput: string;
  handleInputChange: (val: string) => void;
  totalRepos: number | undefined;
  topic: string;
}

interface PaginationProps {
  pages: number[];
  startPage: number;
  currentPage: number;
  handlePrevClick: () => void;
  handleNextClick: () => void;
  handlePageClick: (page: number) => void;
}

export type { SearchResponse, RepositoryData, HeadProps, PaginationProps };
