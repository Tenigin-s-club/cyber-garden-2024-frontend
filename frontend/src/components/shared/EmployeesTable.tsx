import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OfficesEmployee } from "@/services/OfficesOperations/OfficesOperations.type";

import { MonitorCog, PenLine, Trash2 } from "lucide-react";

const EmployeesTable = ({ employees }: { employees: OfficesEmployee[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ФИО</TableHead>
          <TableHead>Должность</TableHead>
          <TableHead>Номер места</TableHead>
          <TableHead>Почта</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow>
            <TableCell>{employee.fio}</TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{employee.place}</TableCell>
            <TableCell>{employee.email}</TableCell>

            <TableCell className="flex items-center justify-between">
              <MonitorCog className="cursor-pointer" />
              <PenLine className="cursor-pointer" />
              <Trash2 className="cursor-pointer" />
            </TableCell>

            {/*Нажимаем на эту ерунду выскакивает окно с инвентарем */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeesTable;
