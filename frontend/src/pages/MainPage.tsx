import OfficeCard from "@/components/shared/OfficeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from "@/components/ui/title";
import { getOfficesOffices } from "@/services/OfficesOperations/OfficesOperations";
import { Office } from "@/services/OfficesOperations/OfficesOperations.type";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [offices, setOffices] = useState<Office[] | null>(null);
  useEffect(() => {
    getOfficesOffices().then((data) => data && setOffices(data));
  }, []);
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <Title size="md" text="Главная" />
        <div className="w-2/5 flex items-center gap-4">
          <Input />
          <Button>
            <Plus />
            Добавить офис
          </Button>
        </div>
      </div>

      <div className="mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offices?.map((item) => (
          <OfficeCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
