import { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

//icon imports
import { Settings, Pencil, Trash } from "lucide-react";

//shadcn UI imports
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

function PasswordTable({ searchQuery }) {
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
            <Settings size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => console.log("Edit:", row.original)}
            >
              <Pencil size={15} />
              <p>Edit</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => console.log("Delete:", row.original.id)}
            >
              <Trash size={15} />
              <p>Delete</p>
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

  const table = useReactTable({
    data,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });
  const filteredRows = table.getRowModel().rows;
  return (
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
  );
}

export default PasswordTable;
