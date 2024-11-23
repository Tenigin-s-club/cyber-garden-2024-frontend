import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddEmployeeForm from "./AddEmployeeForm";
import Title from "../ui/title";

export function AddEmployeeBlock() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Добавить сотрудника
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text="Сотрудник" />
        </DialogHeader>
        <AddEmployeeForm />
      </DialogContent>
    </Dialog>
  );
}
