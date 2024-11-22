import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Users, Map, House } from "lucide-react";
import LogoIcon from "@/assets/logo.svg";

const TopBar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="flex w-full items-center gap-5  py-5 justify-between">
      <div className="flex w-full items-center gap-5">
        <Button variant="outline" size={"lg"} onClick={() => navigate("/")}>
          <House />
          На главную
        </Button>
        <Button size={"lg"} onClick={() => navigate(`/map/${id}`)}>
          <Map />
          Карта
        </Button>
        <Button size={"lg"} onClick={() => navigate(`/employees/${id}`)}>
          <Users /> Таблица
        </Button>
      </div>
      <Link to="/">
        <LogoIcon />
      </Link>
    </div>
  );
};

export default TopBar;
