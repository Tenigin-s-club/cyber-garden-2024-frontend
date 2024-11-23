import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Users, Map, House, Monitor } from "lucide-react";
import LogoIcon from "@/assets/logo.svg";

const TopBar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  return (
    <div className="flex w-full items-center gap-5  py-5 justify-between">
      <div className="flex w-full items-center gap-5">
        <Button
          variant="outline"
          className="min-w-[150px] w-1/6"
          onClick={() => navigate("/")}
        >
          <House />
          На главную
        </Button>
        <Button
          variant={pathname === `/map/${id}` ? "secondary" : "default"}
          className="min-w-[150px] w-1/6"
          onClick={() => navigate(`/map/${id}`)}
        >
          <Map />
          Карта
        </Button>
        <Button
          variant={pathname === `/employees/${id}` ? "secondary" : "default"}
          className="min-w-[150px] w-1/6"
          onClick={() => navigate(`/employees/${id}`)}
        >
          <Users /> Сотрудники
        </Button>
        <Button
          variant={pathname === `/inventories/${id}` ? "secondary" : "default"}
          className="min-w-[150px] w-1/6"
          onClick={() => navigate(`/inventories/${id}`)}
        >
          <Monitor /> Оборудование
        </Button>
      </div>
      <Link to="/">
        <LogoIcon />
      </Link>
    </div>
  );
};

export default TopBar;
