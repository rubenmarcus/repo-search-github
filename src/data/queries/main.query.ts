import { useQuery, gql } from '@apollo/client';

const GET_REPOS = gql`
  query GetRepos($cursor: String) {
    search(query: "topic:react", type: REPOSITORY, first: 10, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
            }
            description
            stargazers {
              totalCount
            }
            watchers {
              totalCount
            }
            forks {
              totalCount
            }
            url
          }
        }
      }
    }
  }
`;

interface RepoData {
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
    edges: { node: RepoData }[];
  };
}

export function useGetRepos() {
  return useQuery<SearchResponse>(GET_REPOS);
}
