import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEmployeeInventory } from "@/services/OfficesOperations/OfficesOperations";
import { Inventory } from "@/services/OfficesOperations/OfficesOperations.type";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  id: string;
}
export function InventoriesForEmployeeTabs({ id }: Props) {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  useEffect(() => {
    getEmployeeInventory(id).then((data) => data && setInventories(data));
  }, []);
  return (
    <Tabs defaultValue="assigned" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="assigned">Назначенное</TabsTrigger>
        <TabsTrigger value="free">Свободное</TabsTrigger>
      </TabsList>
      <TabsContent value="assigned">
        <Input />
        <ScrollArea className="h-[300px] w-full border-none mt-4 rounded-md border p-4">
          {inventories?.map((inventory) => (
            <div className="flex items-center justify-between">
              <p className="w-1/2">{inventory.name}</p>
              <p className="w-1/5">{inventory.id}</p>
              <Trash2 color="#DC2626" className="cursor-pointer" />
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="free">
        <Input />
      </TabsContent>
    </Tabs>
  );
}
