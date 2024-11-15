'use client';

import { useEffect, useState } from 'react';
import columns from './columns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel
} from '@tanstack/react-table';
import axios from 'axios';
interface PaginationState {
  pageIndex: number;
  pageSize: number;
}
interface DataRow {
  totalMarks?: number;
  totalAvgOfMarks?: number;
  specificStoreAvgOfMarks?: number;
  totalAvgOfPercents?: number;
}
const HocsTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const extraCalculations = (data: any) => {
    data.forEach((d:DataRow, i: any) => {
      let marks = 0;
      let count = 0;

      Object.values(d).forEach((v) => {
        if (v === 'Yes') {
          marks++;
          count++;
        } else if (v === 'No') {
          count++;
        }
      });

      data[i].marks = marks;
      data[i].percent = ((marks / count) * 100).toFixed(2);
    });
    // const totalMarks = data.reduce((acc: any, d: DataRow) => acc + d.marks, 0);
    // const totalMarksPercentage = data.reduce((acc: any, d: DataRow) => acc + d.percent, 0);
    // const avgOfMarks = data.length;
    // const avgOfPercents = data.length;
    // data.forEach((d: Record<string, unknown>, i: any) => {
    //   d.totalMarks = totalMarks;
    //   d.totalAvgOfMarks = avgOfMarks;
    //   d.specificStoreAvgOfMarks = totalMarksPercentage;
    //   d.totalAvgOfPercents = avgOfPercents;
    // });
    setFetchedData(data);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://chatwithpdf.in/rnb_callbackurl/hocs'
      );
      setIsLoading(false);
      setFetchedData(response.data.data);
      extraCalculations(response.data.data);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  // const filteredData = fetchedData.filter(item =>
  //   item.traineeName.toLowerCase().includes(searchValue.toLowerCase())
  // );
  // for filter data repace the fetchedData with filteredData
  const table = useReactTable({
    data: fetchedData,
    columns,
    pageCount: Math.ceil(fetchedData.length / pageSize),
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="mb-3 w-full md:max-w-sm"
        />
        <Input
          value={fetchedData.length + ' Records'}
          readOnly
          className="pointer-events-none mb-3 w-fit md:max-w-sm"
        />
      </div>
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
        {isLoading ? (
          <div className="mt-40 flex h-full items-center justify-center">
            <svg
              className="h-8 w-8 animate-spin text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
        ) : (
          <Table className="relative">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-sm font-medium">
                Rows per page
              </p>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HocsTable;
