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
import { useState } from "react";

export function AddEmployeeBlock() {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <AddEmployeeForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
