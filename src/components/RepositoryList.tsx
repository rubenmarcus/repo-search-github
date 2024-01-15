import { useReposData } from "../hooks/useReposData";
import { PaginationComponent } from "./Pagination";
import { RepositoryHead } from "./RepositoryHead";
import { RepositoryTable } from "./RepositoryTable";

const RepositoryList = () => {
  const { loading, error, data, headProps, paginationProps } = useReposData();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <RepositoryHead {...{ headProps }} />
      <RepositoryTable {...{ data, loading }} />
      <PaginationComponent {...paginationProps} />
    </div>
  );
};

export default RepositoryList;
