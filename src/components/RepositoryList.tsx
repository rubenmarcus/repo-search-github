import { useEffect } from "react";
import { useRepositoryData } from "../hooks/useReposData";
import { PaginationComponent } from "./Pagination";
import { RepositoryHead } from "./RepositoryHead";
import { RepositoryTable } from "./RepositoryTable";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";

export const RepositoryList = () => {
  const { loading, error, data, headProps, paginationProps, noRepos } =
    useRepositoryData();

  const debouncedTopic = useDebounce(headProps.searchInput, 1300);

  const topicValue = headProps.topic.split("topic:")[1];

  const navigate = useNavigate();
  useEffect(() => {
    if (debouncedTopic) {
      navigate(`/${debouncedTopic}`);
    }
  }, [debouncedTopic, navigate, headProps.searchInput, topicValue]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container h-full pb-20">
      <RepositoryHead {...{ headProps }} />

      {noRepos ? (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-2xl w-full pt-10">
          No Repositories Found, please try another topic.
        </h1>
      ) : (
        <>
          <RepositoryTable {...{ data, loading }} />
          <PaginationComponent {...paginationProps} />
        </>
      )}
    </div>
  );
};
