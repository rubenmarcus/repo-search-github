import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RepositoryHead } from "@/components/RepositoryHead";

describe("RepositoryHead", () => {
  test("renders RepositoryHead component with provided props", () => {
    const headProps = {
      searchInput: "",
      topic: "topic:react",
      totalRepos: 334098,
      handleInputChange: jest.fn(),
      handleSubmit: jest.fn(),
    };

    const { getByText, getByPlaceholderText, getByTestId } = render(
      <RepositoryHead headProps={headProps} />
    );

    expect(getByText("topic:react")).toBeInTheDocument();

    const inputElement = getByPlaceholderText("Search by topic...");
    expect(inputElement).toBeInTheDocument();

    expect(getByText("334098")).toBeInTheDocument();

    const searchButton = getByText("Search");
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: "new topic" } });
    expect(headProps.handleInputChange).toHaveBeenCalledWith("new topic");

    fireEvent.submit(getByTestId("search-form"));
    // Test if handleSubmit is called
    expect(headProps.handleSubmit).toHaveBeenCalled();
  });
});
