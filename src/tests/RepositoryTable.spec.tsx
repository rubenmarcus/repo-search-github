import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RepositoryTable } from "@/components/RepositoryTable";
import { SEARCH_MOCK } from "./__mocks__/search.mock";

describe("RepositoryTable", () => {
  test("RepositoryTable renders correctly with provided data", () => {
    render(<RepositoryTable data={SEARCH_MOCK} loading={false} />);

    const repoNameElement = screen.getByText(
      SEARCH_MOCK.search.edges[0].node.name
    );
    expect(repoNameElement).toBeInTheDocument();

    const repoNameLink = screen.getByRole("link");
    expect(repoNameLink).toBeInTheDocument();

    expect(repoNameLink).toHaveAttribute(
      "href",
      SEARCH_MOCK.search.edges[0].node.url
    );
  });

  test("RepositoryTable renders loading shimmers", () => {
    const { container } = render(
      <RepositoryTable data={undefined} loading={true} />
    );
    expect(
      container.getElementsByClassName("w-[100px]")[0]
    ).toBeInTheDocument();
  });

  test("RepositoryTable should have correct tablehead labels", () => {
    render(<RepositoryTable data={SEARCH_MOCK} loading={false} />);

    const firstTableHead = screen.getByRole("columnheader", { name: "Name" });
    const secTableHead = screen.getByRole("columnheader", { name: "Owner" });

    const thirdTableHead = screen.getByRole("columnheader", {
      name: "Description",
    });

    const forthTableHead = screen.getByRole("columnheader", {
      name: "Stargazers",
    });

    const fiveTableHead = screen.getByRole("columnheader", {
      name: "Watchers",
    });
    const sixTableHead = screen.getByRole("columnheader", { name: "Forks" });

    expect(firstTableHead).toBeInTheDocument();

    expect(secTableHead).toBeInTheDocument();

    expect(thirdTableHead).toBeInTheDocument();

    expect(forthTableHead).toBeInTheDocument();

    expect(fiveTableHead).toBeInTheDocument();

    expect(sixTableHead).toBeInTheDocument();
  });

  test("Loading RepositoryTable should have correct tablehead labels", () => {
    render(<RepositoryTable data={undefined} loading={true} />);

    const firstTableHead = screen.getByRole("columnheader", { name: "Name" });
    const secTableHead = screen.getByRole("columnheader", { name: "Owner" });

    const thirdTableHead = screen.getByRole("columnheader", {
      name: "Description",
    });

    const forthTableHead = screen.getByRole("columnheader", {
      name: "Stargazers",
    });

    const fiveTableHead = screen.getByRole("columnheader", {
      name: "Watchers",
    });
    const sixTableHead = screen.getByRole("columnheader", { name: "Forks" });

    expect(firstTableHead).toBeInTheDocument();

    expect(secTableHead).toBeInTheDocument();

    expect(thirdTableHead).toBeInTheDocument();

    expect(forthTableHead).toBeInTheDocument();

    expect(fiveTableHead).toBeInTheDocument();

    expect(sixTableHead).toBeInTheDocument();
  });
});
