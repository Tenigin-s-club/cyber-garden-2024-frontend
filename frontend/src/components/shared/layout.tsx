import { Outlet } from "react-router-dom";
import Container from "../ui/container";
import { ProtectedRoute } from "./ProtectedRoute";
import TopBar from "./TopBar";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ProtectedRoute>
      <Container>
        <TopBar />
        {children || <Outlet />}
      </Container>
    </ProtectedRoute>
  );
};

export default Layout;
