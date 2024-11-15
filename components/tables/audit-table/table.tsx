'use client';
import { useEffect, useState } from 'react';
import columns from './columns';
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
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

const AuditTable = ({ data }: { data: any[] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [combinedData, setCombinedData] = useState<any[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });

  const combiningData = async () => {
    // A helper function to initialize the audit structure
    const initializeAudit = () => ({
      unAnnounced: { lastAuditMark: 0, noOfAudit: 0, noOfDays: 0 },
      announced: { lastAuditMark: 0, noOfAudit: 0, noOfDays: 0 }
    });

    // A helper function to process each record
    const processRecord = (record: any, auditType: string) => {
      const audit = {
        lastAuditMark: parseInt(record.freshnessOfGoods) || 0, // Example field, replace with appropriate one
        noOfAudit: parseInt(record.freshnessOfGoods) || 0, // Example field, replace with appropriate one
        noOfDays: parseInt(record.varietyOfGoods) || 0 // Example field, replace with appropriate one
      };
      return audit;
    };

    let filteredData = data;
    if (searchValue) {
      filteredData = data.filter((item) =>
        item.shopName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    const combinedData = filteredData.reduce((acc, current) => {
      let shop = acc.find((item: any) => item.shopName === current.shopName);

      if (!shop) {
        shop = {
          ...current,
          shopName: current.shopName,
          audit: initializeAudit()
        };
        acc.push(shop);
      }

      if (current.announcedUnAnnounced === 'announced') {
        shop.audit.announced = processRecord(current, 'announced');
      } else if (current.announcedUnAnnounced === 'unannounced') {
        shop.audit.unAnnounced = processRecord(current, 'unannounced');
      }

      return acc;
    }, []);
    setCombinedData(combinedData);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    combiningData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchValue]);

  const table = useReactTable({
    data: combinedData,
    columns,
    pageCount: Math.ceil(combinedData.length / pageSize),
    state: { pagination: { pageIndex, pageSize }, columnFilters },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search Shop Name..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="mb-3 w-full md:max-w-sm"
        />
        <div className="mb-3 flex items-center justify-end gap-2">
          <Input
            value={combinedData.length + ' Records'}
            readOnly
            className="pointer-events-none w-28 text-blue-500"
          />
        </div>
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

export default AuditTable;
