import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';

const GITHUB_TOKEN =  import.meta.env.VITE_GITHUB_ACCESS_TOKEN

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export { ApolloProvider, client };