// this mock is intended for component unit test only, not for integration tests

export const SEARCH_MOCK = {
  search: {
    __typename: "SearchResultItemConnection",
    pageInfo: {
      __typename: "PageInfo",
      hasNextPage: true,
      endCursor: "Y3Vyc29yOjEw",
    },
    edges: [
      {
        __typename: "SearchResultItemEdge",
        node: {
          __typename: "Repository",
          name: "vue",
          owner: {
            __typename: "Organization",
            login: "vuejs",
          },
          description:
            "This is the repo for Vue 2. For Vue 3, go to https://github.com/vuejs/core",
          stargazers: {
            __typename: "StargazerConnection",
            totalCount: 206145,
          },
          watchers: {
            __typename: "UserConnection",
            totalCount: 5928,
          },
          forks: {
            __typename: "RepositoryConnection",
            totalCount: 33246,
          },
          url: "https://github.com/vuejs/vue",
        },
      },
    ],
    repositoryCount: 52782,
  },
};

export const RESPONSE_FROM_API = {
  search: {
    edges: [
      {
        node: {
          description:
            "This is the repo for Vue 2. For Vue 3, go to https://github.com/vuejs/core",
          forks: {
            totalCount: 33246,
          },
          name: "vue",
          owner: {
            login: "vuejs",
          },
          stargazers: {
            totalCount: 206145,
          },
          url: "https://github.com/vuejs/vue",
          watchers: {
            totalCount: 5928,
          },
        },
      },
    ],
    pageInfo: {
      endCursor: "Y3Vyc29yOjEw",
      hasNextPage: true,
    },
    repositoryCount: 52782,
  },
};
