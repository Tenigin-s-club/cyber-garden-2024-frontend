import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Title from "../ui/title";
import AddOfficeForm from "./AddOfficeForm";

export function AddOfficeBlock() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Добавить оффис
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text="Оффис" />
        </DialogHeader>
        <AddOfficeForm />
      </DialogContent>
    </Dialog>
  );
}
