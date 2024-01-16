import { renderHook } from "@testing-library/react-hooks";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import { GET_REPOS } from "@/data/queries/main.query";
import useGetRepos from "@/hooks/useGetRepos";
import { RESPONSE_FROM_API, SEARCH_MOCK } from "../__mocks__/search.mock";

const mocks = [
  {
    request: {
      query: GET_REPOS,
      variables: { cursor: null, topic: "topic:vue", pageSize: 1 },
    },
    result: {
      data: SEARCH_MOCK,
    },
  },
];

describe("useGetRepos", () => {
  it("fetches data correctly", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetRepos(), {
      wrapper: ({ children }: { children: JSX.Element }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    // Initial state
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();

    // Trigger the query
    act(() => {
      result.current.getRepos({
        variables: { cursor: null, topic: "topic:vue", pageSize: 1 },
      });
    });

    // Verify loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();

    // Wait for the query to complete
    await waitForNextUpdate();

    // Verify the final state after the query
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toMatchObject(RESPONSE_FROM_API);
  });

  it("handles error correctly", async () => {
    const errorMock = [
      {
        request: {
          query: GET_REPOS,
          variables: { cursor: null, topic: "topic:vue", pageSize: 1 },
        },
        error: new Error("Something went wrong"),
      },
    ];

    const { result, waitForNextUpdate } = renderHook(() => useGetRepos(), {
      wrapper: ({ children }: { children: JSX.Element }) => (
        <MockedProvider mocks={errorMock} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    // Trigger the query
    act(() => {
      result.current.getRepos({
        variables: { cursor: null, topic: "topic:vue", pageSize: 1 },
      });
    });

    // Verify loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();

    // Wait for the query to complete
    await waitForNextUpdate();

    // Verify the final state after the query
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });
});
