import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function TableSkeleton() {
  return (
    <div className="w-[60rem]">
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: 8 }).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-6 w-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 8 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Skeleton className="h-8 w-[250px]" />
        <div className="space-x-2">
          <Skeleton className="inline-block h-10 w-[100px]" />
          <Skeleton className="inline-block h-10 w-[100px]" />
        </div>
      </div>
    </div>
  );
}