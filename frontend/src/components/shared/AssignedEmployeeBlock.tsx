import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserCog } from "lucide-react";
import Title from "../ui/title";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OfficesEmployee } from "@/services/OfficesOperations/OfficesOperations.type";
import { getOfficesEmployees } from "@/services/OfficesOperations/OfficesOperations";

export function AssignedEmployeeBlock() {
  const [employeesData, setEmployeesData] = useState<OfficesEmployee[]>([]);
  const { id } = useParams();

  const bindEmployee = (EmployeeId: string) => {
    return EmployeeId; //а здесь мы запрашиваем функцию для связки с бэка
  };

  useEffect(() => {
    getOfficesEmployees(Number(id)).then(
      (data) => data && setEmployeesData(data)
    );
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <UserCog className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text="Назначить сотрудника" />
        </DialogHeader>
        <div>
          <div>
            <Input />
            <ScrollArea className="h-[300px] w-full border-none mt-4 rounded-md border p-4">
              {employeesData.map((employee) => (
                <p
                  className="border-y py-3 cursor-pointer"
                  onClick={() => bindEmployee(employee.id)}
                >
                  {employee.fio}
                </p>
              ))}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
