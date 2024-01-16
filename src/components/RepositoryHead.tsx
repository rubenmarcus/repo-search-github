import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HeadProps } from "@/types/types";
import { Skeleton } from "./ui/skeleton";

export const RepositoryHead = ({
  headProps,
}: {
  headProps: HeadProps;
}): JSX.Element => {
  const { handleSubmit, searchInput, handleInputChange, totalRepos, topic } =
    headProps;

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl w-full pt-10">
        Github Repository Search
      </h1>
      <h2> Search Github repositories by topic </h2>
      <div className="flex w-full my-5 gap-10 items-center">
        <h3> {topic}</h3>
        <div className="flex gap-2 items-center">
          <p>Total Repositories:{" "}</p>
          {totalRepos ?? <Skeleton className="w-[80px] h-[12px] " />}
        </div>
        <form
          onSubmit={handleSubmit}
          className="ml-auto flex"
          data-testid="search-form"
        >
          <Input
            type="text"
            placeholder="Search by topic..."
            value={searchInput}
            name="search"
            onChange={(e) => {
              handleInputChange(e.target.value);
            }}
            className="border-stone-400 mr-2"
          />
          <Button
            className="primary hover:bg-white hover:text-black"
            type="submit"
          >
            Search
          </Button>
        </form>
      </div>
    </>
  );
};
