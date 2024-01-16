import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetRepos from "./useGetRepos";
import { useDebounce } from "@uidotdev/usehooks";

export const useReposData = () => {
  const [pageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("topic:react");

  const debouncedTopic = useDebounce(searchInput, 1300);

  const { topic: routeTopic } = useParams();

  const navigate = useNavigate();

  const topicValue = topic.split("topic:")[1];

  const { getRepos, loading, error, data } = useGetRepos();


  console.log(JSON.stringify(data, undefined, 3), 'data')

  const handleInputChange = (val: string) => {
    setSearchInput(val);
  };

  useEffect(() => {
    if (debouncedTopic) {
      navigate(`/${debouncedTopic}`);
    }
  }, [debouncedTopic, navigate, searchInput, topicValue]);

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
    totalRepos: data?.search.repositoryCount
    
  };

  return {
    loading,
    error,
    data,
    headProps,
    paginationProps,
    noRepos: data?.search.repositoryCount === 0
  };
};
