import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getPasswordsAPI } from "@/api";
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
  const [editId, setEditId] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPasswordsAPI();
        setData(response.data);
      } catch (err) {
        const errorMessage = err.response.data.message;
        if (errorMessage.includes("jwt") || errorMessage.includes("login")) {
          localStorage.clear();
          navigate("/");
        }
      }
    };
    fetchData();
  }, []);


  const columnDef = [
    {
      header: "Website Name",
      accessorKey: "websiteName",
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
                setEditId(row.original._id);
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
                setRowId(row.original._id);
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
    pageSize: 5,
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
      <div className="flex items-center gap-3 pr-5 w-full justify-center">
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
        editFlag={editId}
        deleteFlag={rowId}
      />
    </>
  );
}

export default PasswordTable;
