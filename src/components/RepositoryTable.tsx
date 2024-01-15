import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchResponse } from "@/types/types";

const LoadingTable = () => {
  const skeletonRow = (
    <>
      <TableCell className="font-medium">
        <Skeleton className="w-[100px] h-[20px] " />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[100px] h-[20px] " />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[100px] h-[20px] " />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-[100px] h-[20px] " />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-[100px] h-[20px] " />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-[100px] h-[20px] " />
      </TableCell>
    </>
  );

  const skeletonRows = Array.from({ length: 10 }, (_, index) => (
    <TableRow className="border-stone-700" key={`skeleton-row-${index}`}>
      {skeletonRow}
    </TableRow>
  ));

  return (
    <Table className="text-xs bg-[#333]">
      <TableHeader>
        <TableRow className="table-row-head border-stone-700">
          <TableHead className="w-[100px]  text-white">Name</TableHead>
          <TableHead className="text-white">Owner</TableHead>
          <TableHead className="text-white">Description</TableHead>
          <TableHead className="text-right  text-white">Stargazers</TableHead>
          <TableHead className="text-right  text-white">Watchers</TableHead>
          <TableHead className="text-right  text-white">Forks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{skeletonRows}</TableBody>
    </Table>
  );
};

const TableContainer = ({ data }: { data: SearchResponse }): JSX.Element => {
  return (
    <Table className="text-xs bg-[#333]">
      <TableHeader>
        <TableRow className="table-row-head border-stone-700 ">
          <TableHead className="w-[140px] text-white">Name</TableHead>
          <TableHead className="w-[100px] text-white">Owner</TableHead>
          <TableHead className="w-[210px] text-white">Description</TableHead>
          <TableHead className="text-right text-white">Stargazers</TableHead>
          <TableHead className="text-right text-white">Watchers</TableHead>
          <TableHead className="text-right text-white">Forks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.search.edges.map(({ node }) => (
          <TableRow
            key={node.url}
            className="border-stone-700 table-row hover:bg-[#444]"
          >
            <TableCell className="font-medium">
              <a href={node.url} target="_blank">
                {" "}
                {node.name}
              </a>
            </TableCell>
            <TableCell>{node.owner.login}</TableCell>
            <TableCell className="text-wrap">{node.description}</TableCell>
            <TableCell className="text-right">
              {node.stargazers.totalCount}
            </TableCell>
            <TableCell className="text-right">
              {node.watchers.totalCount}
            </TableCell>
            <TableCell className="text-right">
              {node.forks.totalCount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const RepositoryTable = ({ data, loading }: {data: SearchResponse | undefined, loading:boolean}): JSX.Element => {
  if (loading) {
    return <LoadingTable />;
  }

  return data ? <TableContainer data={data} /> : <></>;
};
