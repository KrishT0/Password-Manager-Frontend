import { useMemo, useState, useEffect, useRef } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

//icon imports
import {
  Settings,
  Pencil,
  Trash,
  Copy,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
  ChevronLeft,
} from "lucide-react";

//shadcn UI imports
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PasswordModal from "./PasswordModal";

function PasswordTable({ searchQuery }) {
  const dialogueOpenTriggerRef = useRef(null);
  const [rowData, setRowData] = useState({});
  const [rowId, setRowId] = useState("");

  const data = useMemo(
    () => [
      {
        id: 1,
        link: "https://www.google.com",
        name: "Google",
        email: "example@gamil.com",
        password: "password123",
      },
      {
        id: 2,
        link: "https://www.google.com",
        name: "Facebook",
        email: "example@gamil.com",
        password: "password123",
      },
      {
        id: 3,
        link: "https://www.google.com",
        name: "Yahoo",
        email: "example@gamil.com",
        password: "password123",
      },
      {
        id: 4,
        link: "https://www.google.com",
        name: "Mtop",
        email: "example@gamil.com",
        password: "password123",
      },
      {
        id: 5,
        link: "https://www.google.com",
        name: "TCS",
        email: "example@gamil.com",
        password: "password123",
      },
    ],
    []
  );

  const columnDef = [
    {
      header: "Website Name",
      accessorKey: "name",
      cell: (row) => <div>{row.getValue()}</div>,
      enableGlobalFilter: true,
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (row) => <div>{row.getValue()}</div>,
      enableGlobalFilter: false,
    },
    {
      header: "Password",
      accessorKey: "password",
      cell: (row) => <div>{row.getValue()}</div>,
      enableGlobalFilter: false,
    },
    {
      header: "Action",
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => {
                setRowId("");
                setRowData(row.original);
                dialogueOpenTriggerRef.current.click();
              }}
            >
              <Pencil size={15} />
              <p>Edit</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => {
                setRowId(row.original.id);
                dialogueOpenTriggerRef.current.click();
              }}
            >
              <Trash size={15} />
              <p>Delete</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 items-center cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(row.original.password)
              }
            >
              <Copy size={15} />
              <p>Copy Password</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const [globalFilter, setGlobalFilter] = useState(searchQuery || "");
  useEffect(() => {
    setGlobalFilter(searchQuery);
  }, [searchQuery]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

  const table = useReactTable({
    data,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
  });

  const filteredRows = table.getRowModel().rows;

  return (
    <>
      <Table>
        <TableCaption>A list of your recent passwords.</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {filteredRows.length > 0 ? (
            filteredRows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="text-center"
              >
                No matching results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center gap-3 pr-5 w-full justify-end">
        <Button
          variant="outline"
          className="p-[6px] h-8 w-8"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="p-[7px] h-8 w-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        <p className="text-sm">
          {" "}
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <Button
          variant="outline"
          className="p-[7px] h-8 w-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="p-[6px] h-8 w-8"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight />
        </Button>
      </div>
      <PasswordModal
        ref={dialogueOpenTriggerRef}
        data={rowData}
        deleteFlag={rowId}
      />
    </>
  );
}

export default PasswordTable;
