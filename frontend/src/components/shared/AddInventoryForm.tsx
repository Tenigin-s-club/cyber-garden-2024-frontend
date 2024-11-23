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
import { addOfficesInventories } from "@/services/OfficesOperations/OfficesOperations";

const addInventorySchema = z.object({
  name: z.string().min(3, {
    message: "название должно быть не короче 3х символов",
  }),
  id: z.string().min(1, {
    message: "Необходимо указать id",
  }),
});

const AddInventoryForm = () => {
  const form = useForm<z.infer<typeof addInventorySchema>>({
    resolver: zodResolver(addInventorySchema),
    defaultValues: {
      name: "",
      id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addInventorySchema>) {
    const res = await addOfficesInventories({
      name: values.name,
      id: Number(values.id),
    });
    // if (res) navigate("/");
    console.log(values);
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
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input placeholder="id" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-8">
            Создать
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddInventoryForm;
