import { GET_REPOS } from '@/data/queries/main.query';
import { SearchResponse } from '@/types/types';
import { useLazyQuery } from '@apollo/client';


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
