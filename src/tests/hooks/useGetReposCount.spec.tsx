import { renderHook } from "@testing-library/react-hooks";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import {  GET_REPOS_COUNT } from "@/data/queries/main.query";
import { COUNT_MOCK, RESPONSE_FROM_COUNT } from "../__mocks__/search.mock";
import { useGetReposCount } from "@/hooks/useGetReposCount";

const mocks = [
  {
    request: {
      query: GET_REPOS_COUNT,
      variables: { topic: "topic:vue" },
    },
    result: {
      data: COUNT_MOCK,
    },
  },
];

describe("useGetReposCount", () => {
  test("fetches data correctly", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetReposCount(), {
      wrapper: ({ children }: { children: JSX.Element }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    // Initial state
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.reposCount).toBeUndefined();

    // Trigger the query
    act(() => {
      result.current.getReposCount({
        variables: { topic: "topic:vue"},
      });
    });

    // Verify loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.reposCount).toBeUndefined();

    // Wait for the query to complete
    await waitForNextUpdate();

    // Verify the final state after the query
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.reposCount).toEqual(RESPONSE_FROM_COUNT.search.repositoryCount);
  });

  test("handles error correctly", async () => {
    const errorMock = [
      {
        request: {
          query: GET_REPOS_COUNT,
          variables: {topic: "topic:vue"},
        },
        error: new Error("Something went wrong"),
      },
    ];

    const { result, waitForNextUpdate } = renderHook(() => useGetReposCount(), {
      wrapper: ({ children }: { children: JSX.Element }) => (
        <MockedProvider mocks={errorMock} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    // Trigger the query
    act(() => {
      result.current.getReposCount({
        variables: { topic: "topic:vue"},
      });
    });

    // Verify loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.reposCount).toBeUndefined();

    // Wait for the query to complete
    await waitForNextUpdate();

    // Verify the final state after the query
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeDefined();
    expect(result.current.reposCount).toBeUndefined();
  });
});
