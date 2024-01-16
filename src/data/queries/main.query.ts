import {  gql } from '@apollo/client';

export const GET_REPOS = gql`
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
