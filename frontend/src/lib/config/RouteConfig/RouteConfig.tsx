import Layout from "@/components/shared/layout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import LogoIcon from "@/assets/logo.svg";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import Container from "@/components/ui/container";
<<<<<<< HEAD
// import InventoriesTablePageAsync from "@/pages/InventoriesTablePage/InventoriesTablePage.async";
// import EmployeesTablePageAsync from "@/pages/EmployeesTablePage/EmployeesTablePage.async";
import AuthPageAsync from "@/pages/AuthPage/AuthPage.async";
import MainPageAsync from "@/pages/MainPage/MainPage.async";
import MapPageAsync from "@/pages/MapPage/MapPage.async";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import EmployeesTablePage from "@/pages/EmployeesTablePage/EmployeesTablePage";
import InventoriesTablePage from "@/pages/InventoriesTablePage/InventoriesTablePage";
=======
import InventoriesTablePage from "@/pages/InventoriesTablePage";
import { MapLayout } from "@/components/shared/MapLayout";
import { Map } from "@/components/shared/map/Map";
>>>>>>> 8a8a0cc (huesos)

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
<<<<<<< HEAD
          <MainPageAsync />
        </Container>
      </ProtectedRoute>
=======
          <MainPage />
        </Container>
      </ProtectedRoute>
    ),
  },
  {
    path: "/map/:id",
    element: (
      <ProtectedRoute>
        <MapLayout>
          <Map />
        </MapLayout>
      </ProtectedRoute>
>>>>>>> 8a8a0cc (huesos)
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
        element: <EmployeesTablePage />,
      },
<<<<<<< HEAD
      {
        path: "/map/:id",
        element: <MapPageAsync />,
      },
=======
      // {
      //   path: "/map/:id",
      //   element: <Map />,
      // },
>>>>>>> 8a8a0cc (huesos)
      {
        path: "/inventories/:id",
        element: <InventoriesTablePage />,
      },
    ],
  },
]);
