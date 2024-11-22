import EmployeesTable from "@/components/shared/EmployeesTable";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { OfficesEmployee } from "@/services/OfficesOperations/OfficesOperations.type";

export const columns: ColumnDef<OfficesEmployee>[] = [
  {
    accessorKey: "fio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ФИО
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Должность",
  },
  {
    accessorKey: "place",
    header: "Место",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Почта
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

const TablePage = () => {
  return (
    <Container>
      <EmployeesTable
        columns={columns}
        data={[
          {
            id: "790a838d-b21f-43d1-88f6-aac6da213ae5",
            fio: "Piradasov Huesos Eblanovich",
            position: "huesos developer",
            email: "huesos@mail.ru",
            place: "15",
            inventory: [{ id: "1", name: "palka ebalka" }],
          },
          {
            id: "790a838d-b21f-43d1-88f6-aac6da213ae5",
            fio: "adjfioew Hsdfs dgjl;jwleifd",
            position: "developer",
            email: "huesdfalsos@mail.ru",
            place: "15",
            inventory: [{ id: "4", name: "fkdlsa ebalka" }],
          },
          {
            id: "790a838d-b21fsdfjsk-43d1-88f6-aac6da213ae5",
            fio: "dkfsd Husdfjesos Eblasdfnsdnovich",
            position: " ffffffffff",
            email: "dfkald@mail.ru",
            place: "15",
            inventory: [{ id: "5", name: "palka sdklfn" }],
          },
        ]}
      />
    </Container>
  );
};

export default TablePage;
