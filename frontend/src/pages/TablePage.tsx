import EmployeesTable from "@/components/shared/EmployeesTable";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const TablePage = () => {
  return (
    <Container>
      <div className="w-full flex items-center gap-3">
        <Input />{" "}
        <Button>
          <Plus />
          Добавить
        </Button>
      </div>
      <EmployeesTable
        employees={[
          {
            id: "790a838d-b21f-43d1-88f6-aac6da213ae5",
            fio: "Piradasov Huesos Eblanovich",
            position: "huesos developer",
            email: "huesos@mail.ru",
            place: "15",
            inventory: [{ id: "1", name: "palka ebalka" }],
          },
        ]}
      />
    </Container>
  );
};

export default TablePage;
