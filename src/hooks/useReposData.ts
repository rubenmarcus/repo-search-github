import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetRepos from "./useGetRepos";

export const useRepositoryData = () => {
  const [pageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("topic:react");


  const { topic: routeTopic } = useParams();

  const navigate = useNavigate();


  const { getRepos, loading, error, data } = useGetRepos();

  const handleInputChange = (val: string) => {
    setSearchInput(val);
  };


  useEffect(() => {
    const newTopic = routeTopic ? `topic:${routeTopic}` : "topic:react";
    setTopic(newTopic);
    getRepos({
      variables: {
        cursor: null,
        topic: newTopic,
        pageSize,
      },
    });
  }, [routeTopic, pageSize]);

  const totalPages = data?.search?.repositoryCount
    ? Math.ceil(data?.search?.repositoryCount / pageSize)
    : 0;
  const maxVisiblePages = 8;
  const pages = Array.from(
    { length: Math.min(totalPages, maxVisiblePages) },
    (_, i) => i + 1
  );
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    getRepos({
      variables: {
        cursor: data?.search.pageInfo.endCursor,
        topic,
        pageSize,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchData = formData.get("search");

    if (searchData) {
      navigate(`/${searchData}`);
    }

    e.currentTarget.reset();
    e.currentTarget.focus();
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      getRepos({
        variables: {
          cursor: data?.search.pageInfo.endCursor,
          topic,
          pageSize,
        },
      });
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getRepos({
        variables: {
          cursor: data?.search.pageInfo.endCursor,
          topic,
          pageSize,
        },
      });
    }
  };

  const paginationProps = {
    pages,
    currentPage,
    totalPages,
    handlePrevClick,
    handleNextClick,
    handlePageClick,
    startPage,
  };

  const headProps = {
    handleSubmit,
    handleInputChange,
    searchInput,
    topic,
    totalRepos: data?.search.repositoryCount,
  };

  return {
    loading,
    error,
    data,
    headProps,
    paginationProps,
    noRepos: data?.search.repositoryCount === 0,
  };
};
