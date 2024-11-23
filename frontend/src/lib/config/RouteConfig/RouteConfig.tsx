import Layout from "@/components/shared/layout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { AuthPage } from "@/pages/AuthPage";
import MainPage from "@/pages/MainPage";
import EmployeesTablePage from "@/pages/EmployeesTablePage";
import LogoIcon from "@/assets/logo.svg";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import Container from "@/components/ui/container";
import { Map } from "@/pages/MapPage";
import InventoriesTablePage from "@/pages/InventoriesTablePage";

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <AuthPage />,
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
          <MainPage />
        </Container>
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <ProtectedRoute>
        <div>Error</div>
      </ProtectedRoute>
    ),
    children: [
      // {
      //   path: "/",
      //   element: <MainPage />,
      // },
      {
        path: "/employees/:id",
        element: <EmployeesTablePage />,
      },
      {
        path: "/map/:id",
        element: <Map />,
      },
      {
        path: "/inventories/:id",
        element: <InventoriesTablePage />,
      },
    ],
  },
]);
