import { FC, PropsWithChildren } from "react";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import Container from "../ui/container";

export const MapLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Container>
        <TopBar />
      </Container>
      {children || <Outlet />}
    </div>
  );
};
