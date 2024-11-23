import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Users, Map, House, Monitor, Menu, X } from "lucide-react";
import LogoIcon from "@/assets/logo.svg";

import { useState } from "react";

const TopBar = () => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  return (
    <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
      <div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            navbar ? "block" : "hidden"
          }`}
        >
          <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <li>
              <Button
                variant="outline"
                className="min-w-[150px] w-1/6"
                onClick={() => navigate("/")}
              >
                <House />
                На главную
              </Button>
            </li>
            <li>
              <Button
                variant={pathname === `/map/${id}` ? "secondary" : "default"}
                className="min-w-[150px] w-1/6"
                onClick={() => navigate(`/map/${id}`)}
              >
                <Map />
                Карта
              </Button>
            </li>
            <li>
              <Button
                variant={
                  pathname === `/employees/${id}` ? "secondary" : "default"
                }
                className="min-w-[150px] w-1/6"
                onClick={() => navigate(`/employees/${id}`)}
              >
                <Users /> Сотрудники
              </Button>
            </li>
            <li>
              <Button
                variant={
                  pathname === `/inventories/${id}` ? "secondary" : "default"
                }
                className="min-w-[150px] w-1/6"
                onClick={() => navigate(`/inventories/${id}`)}
              >
                <Monitor /> Оборудование
              </Button>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link to="/">
            <LogoIcon />
          </Link>
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
