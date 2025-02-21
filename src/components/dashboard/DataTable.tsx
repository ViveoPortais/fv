"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel
} from "@tanstack/react-table";

import { CgSpinner } from "react-icons/cg";

import { useLateralMenu } from "@/hooks/useMenus";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pageSizeOptions?: number[];
  bgColor?: string;
  textColor?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  pageSizeOptions = [10, 25, 50, 100],
  bgColor,
  textColor
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { isMenuOpen } = useLateralMenu();

  return (
    <div
      className={`w-[90vw] ${
        isMenuOpen ? "lg:w-[70vw]" : "lg:w-[calc(95vw-100px)]"
      } mx-auto`}
    >
      <div className="rounded-lg border relative">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/50 z-20 flex items-center justify-center">
            <CgSpinner size={36} className={`${textColor} animate-spin`} />
          </div>
        )}
        <Table>
          <TableHeader className={`${bgColor}`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`text-center min-w-[150px] max-w-[200px] truncate text-white first:rounded-tl-lg last:rounded-tr-lg`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="[&>*:nth-child(even)]:bg-gray-100">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-center min-w-[150px] max-w-[200px] truncate group-last:first:rounded-bl-lg group-last:last:rounded-br-lg whitespace-nowrap"
                    >
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
                  className="h-24  text-center text-[#919191]"
                >
                  Sem dados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex w-full items-center justify-between gap-4 overflow-auto md:px-2 py-1 flex-row sm:gap-8">
          <div className="flex items-center md:space-x-2">
            <p className="whitespace-nowrap text-sm font-medium hidden md:flex">
              Linhas por página
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 flex-row sm:gap-6 lg:gap-8">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                aria-label="Go to first page"
                variant="semighost"
                className="hidden size-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <HiChevronDoubleLeft className="size-4" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to previous page"
                variant="semighost"
                className="size-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <HiChevronLeft className="size-4" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to next page"
                variant="semighost"
                className="size-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <HiChevronRight className="size-4" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to last page"
                variant="semighost"
                className="hidden size-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <HiChevronDoubleRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
