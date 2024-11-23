import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, UserCog } from "lucide-react";
import Title from "../ui/title";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { OfficesEmployee } from "@/services/OfficesOperations/OfficesOperations.type";
import { attachInventory } from "@/services/BuildOperations/BuildOperations";

interface Props {
  inventoryId: number;
  employeesData: OfficesEmployee[];
}

export function AssignedEmployeeBlock({ inventoryId, employeesData }: Props) {
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
                <div className="border-b flex items-center justify-between py-3">
                  <p>{employee.fio}</p>
                  <Link
                    color="#16a34a"
                    className="cursor-pointer"
                    onClick={() => attachInventory(employee.id, [inventoryId])}
                  />
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
