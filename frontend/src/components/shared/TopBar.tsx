import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Users, Map, House } from "lucide-react";

const TopBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full items-center gap-5 py-5">
      <Button size={"lg"} onClick={() => navigate("/")}>
        <House />
        На главную
      </Button>
      <Button size={"lg"} onClick={() => navigate("/map")}>
        <Map />
        Карта
      </Button>
      <Button size={"lg"} onClick={() => navigate("/employees")}>
        <Users /> Таблица
      </Button>
    </div>
  );
};

export default TopBar;
