import { GET_REPOS_COUNT } from "@/data/queries/main.query";
import { RepositoryCountResponse } from "@/types/types";
import { useLazyQuery } from "@apollo/client";

export const useGetReposCount = () => {
  const [getReposCount, { loading, error, data }] =
    useLazyQuery<RepositoryCountResponse>(GET_REPOS_COUNT);

    console.log(data, ' data?.search.repositoryCount')

  return {
    getReposCount,
    loading,
    error,
    reposCount: data?.search.repositoryCount,
  };
};
