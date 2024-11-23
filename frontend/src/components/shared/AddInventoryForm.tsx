import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { addInventory } from "@/services/BuildOperations/BuildOperations";

const addInventorySchema = z.object({
  name: z.string().min(3, {
    message: "название должно быть не короче 3х символов",
  }),
});

interface Props {
  closeDialog: () => void;
}

const AddInventoryForm = ({ closeDialog }: Props) => {
  const form = useForm<z.infer<typeof addInventorySchema>>({
    resolver: zodResolver(addInventorySchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addInventorySchema>) {
    const res = await addInventory(values.name);
    if (res) closeDialog();
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="название" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="sm:justify-start">
            <Button type="submit" className="w-full mt-8">
              Создать
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default AddInventoryForm;
