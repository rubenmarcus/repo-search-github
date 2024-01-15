import { SearchResponse } from '@/types/types';
import { useLazyQuery, gql } from '@apollo/client';

const GET_REPOS = gql`
  query GetRepos($cursor: String, $topic: String!, $pageSize: Int) {
    search(query: $topic, type: REPOSITORY, first: $pageSize, after: $cursor) {
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
      repositoryCount
    }
  }
`;


const useGetRepos = () => {
  const [getRepos, { loading, error, data }] = useLazyQuery<SearchResponse>(GET_REPOS);

  return {
    getRepos,
    loading,
    error,
    data,
  };
};

export default useGetRepos;
