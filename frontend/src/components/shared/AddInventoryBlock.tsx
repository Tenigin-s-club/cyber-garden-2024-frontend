import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Title from "../ui/title";
import AddInventoryForm from "./AddInventoryForm";
import { useState } from "react";

export function AddInventoryBlock() {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Добавить инвентарь
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text="Оборудование" />
        </DialogHeader>
        <AddInventoryForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
