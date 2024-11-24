import { FC } from "react";
import { itemColor, SidebarItem } from "./SidebarItem";

export type AddingFurnite = {
  x: number;
  y: number;
  id: number;
  size_x: number;
  size_y: number;
  name: string;
  type: number;
};

interface MapSidebarProps {
  furnites: { name: string; size_x: number; size_y: number; id: number }[];
}

export const MapSidebar: FC<MapSidebarProps> = ({ furnites }) => {
  return (
    <div
      className="h-5/6 flex border border-gray-200 z-10 bg-white flex-col gap-4 w-1/6 absolute m-4 rounded-xl top-20 right-0"
      style={{ height: "-webkit-fill-available" }}
    >
      <div className="relative p-4 flex flex-col gap-5 rounded-xl">
        {furnites.map(({ id, size_x, size_y, name }) => (
          <div className="relative flex gap-1 items-center justify-left">
            <SidebarItem
              style={{
                backgroundColor: itemColor[id % itemColor.length],
              }}
              id={id}
              key={id}
              size_x={size_x}
              size_y={size_y}
            />
            <span className="text-sm caret-slate-800">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
