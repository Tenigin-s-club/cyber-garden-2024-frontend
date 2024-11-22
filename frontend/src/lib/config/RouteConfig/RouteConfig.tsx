import Layout from "@/components/shared/layout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { AuthPage } from "@/pages/AuthPage";
import MainPage from "@/pages/MainPage";
import TablePage from "@/pages/TablePage";

import { createBrowserRouter, RouteObject } from "react-router-dom";

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
    element: <Layout />,
    errorElement: (
      <ProtectedRoute>
        <div>Error</div>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/employees",
        element: <TablePage />,
      },
      {
        path: "/map",
        element: <div>MapPage</div>,
      },
    ],
  },
]);
