import { useReposData } from "../hooks/useReposData";
import { PaginationComponent } from "./Pagination";
import { RepositoryHead } from "./RepositoryHead";
import { RepositoryTable } from "./RepositoryTable";

const RepositoryList = () => {
  const { loading, error, data, headProps, paginationProps, noRepos } =
    useReposData();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container h-full pb-20">
      <RepositoryHead {...{ headProps }} />

      {noRepos ? (
        <h1> No Repositories Found, please try another topic.</h1>
      ) : (
        <>
          <RepositoryTable {...{ data, loading }} />
          <PaginationComponent {...paginationProps} />
        </>
      )}
    </div>
  );
};

export default RepositoryList;
