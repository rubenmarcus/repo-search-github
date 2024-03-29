import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetRepos from "./useGetRepos";
import { useGetReposCount } from "./useGetReposCount";

export const useRepositoryData = () => {
  const [pageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("topic:react");

  const { topic: routeTopic } = useParams();

  const navigate = useNavigate();

  const { getRepos, loading, error, data } = useGetRepos();

  const { getReposCount, reposCount } = useGetReposCount();

  const handleInputChange = (val: string) => {
    setSearchInput(val);
  };

  useEffect(() => {
    const newTopic = routeTopic ? `topic:${routeTopic}` : "topic:react";
    setTopic(newTopic);
    setCurrentPage(1);

    getReposCount({
      variables: {
        topic: newTopic,
      },
    });

    getRepos({
      variables: {
        cursor: null,
        topic: newTopic,
        pageSize,
      },
    });
  }, [routeTopic, pageSize]);

  const totalPages = useMemo(() => {
    return reposCount ? Math.ceil(reposCount / pageSize) : 0;
  }, [reposCount, pageSize]);

  const maxVisiblePages = 8;
  const pages = useMemo(() => {
    return Array.from(
      { length: Math.min(totalPages, maxVisiblePages) },
      (_, i) => i + 1
    );
  }, [totalPages, maxVisiblePages]);
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
    totalRepos: reposCount,
  };

  return {
    loading,
    error,
    data,
    headProps,
    paginationProps,
    noRepos: reposCount === 0,
  };
};
