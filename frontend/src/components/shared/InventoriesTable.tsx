import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { PenLine, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddInventoryBlock } from "./AddInventoryBlock";
import { AssignedEmployeeBlock } from "./AssignedEmployeeBlock";
import {
  Inventory,
  OfficesEmployee,
} from "@/services/OfficesOperations/OfficesOperations.type";
import { deleteInventory } from "@/services/BuildOperations/BuildOperations";
import { getOfficesEmployees } from "@/services/OfficesOperations/OfficesOperations";
import { useParams } from "react-router-dom";

interface Props<TValue> {
  columns: ColumnDef<Inventory, TValue>[];
  data: Inventory[];
  updateData: () => void;
}

function InventoriesTable<TValue>({
  columns,
  data,
  updateData,
}: Props<TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [employeesData, setEmployeesData] = useState<OfficesEmployee[]>([]);
  const { id } = useParams();

  useEffect(() => {
    getOfficesEmployees(Number(id)).then(
      (data) => data && setEmployeesData(data)
    );
  }, [id]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const deleteFunc = async (id: number) => {
    await deleteInventory(id);
    updateData();
  };
  return (
    <div>
      <div className="flex items-center py-4 justify-between gap-2">
        <Input
          placeholder="Искать по Названию..."
          value={(table.getColumn("fio")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fio")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <AddInventoryBlock updateData={updateData} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, id) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="flex items-center justify-between gap-2">
                    <AssignedEmployeeBlock
                      inventoryId={data[id]?.id}
                      employeesData={employeesData}
                    />
                    {/*Нажимаем на эту ерунду выскакивает окно с инвентарем */}
                    <PenLine color="#3B82F6" className="cursor-pointer" />
                    <Trash2
                      color="#DC2626"
                      className="cursor-pointer"
                      onClick={() => deleteFunc(data[id].id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Результаты не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default InventoriesTable;
