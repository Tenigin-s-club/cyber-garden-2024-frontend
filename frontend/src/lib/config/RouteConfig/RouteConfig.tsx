import Layout from "@/components/shared/layout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import LogoIcon from "@/assets/logo.svg";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import Container from "@/components/ui/container";
import AuthPageAsync from "@/pages/AuthPage/AuthPage.async";
import MainPageAsync from "@/pages/MainPage/MainPage.async";
import MapPageAsync from "@/pages/MapPage/MapPage.async";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
// import EmployeesTablePage from "@/pages/EmployeesTablePage/EmployeesTablePage";
// import InventoriesTablePage from "@/pages/InventoriesTablePage/InventoriesTablePage";
import MainPage from "@/pages/MainPage/MainPage";
import EmployeesTablePageAsync from "@/pages/EmployeesTablePage/EmployeesTablePage.async";
import InventoriesTablePageAsync from "@/pages/InventoriesTablePage/InventoriesTablePage.async";

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <AuthPageAsync />,
  },
];

export const appRoutersConfig = createBrowserRouter([
  ...authRoutes,
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Container>
          <div className="w-full flex pt-5">
            <LogoIcon />
          </div>
          <MainPageAsync />
        </Container>
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/employees/:id",
        element: <EmployeesTablePageAsync />,
      },
      {
        path: "/map/:id",
        element: <MapPageAsync />,
      },
      {
        path: "/inventories/:id",
        element: <InventoriesTablePageAsync />,
      },
    ],
  },
]);
