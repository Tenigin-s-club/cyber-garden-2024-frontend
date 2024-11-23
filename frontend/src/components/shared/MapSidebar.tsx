import { FC } from "react";
import { itemColor, SidebarItem } from "./SidebarItem";

export type AddingFurnite = {
  x: number;
  y: number;
  id: number;
  size_x: number;
  size_y: number;
  name: string;
  floor_id: number;
};

interface MapSidebarProps {
  furnites: AddingFurnite[];
}

export const MapSidebar: FC<MapSidebarProps> = ({ furnites }) => {
  return (
    <div
      className="flex border border-gray-200 z-10 bg-white flex-col gap-4 w-1/6 absolute m-4 rounded-xl right-0"
      style={{ height: "-webkit-fill-available" }}
    >
      <div className=" relative p-4 flex flex-col gap-5 rounded-xl">
        {furnites.map(({ id, size_x, size_y, x, y, name }) => (
          <div className="relative flex gap-1 items-center justify-left">
            <SidebarItem
              style={{
                backgroundColor: itemColor[id % itemColor.length],
              }}
              id={id}
              x={x}
              y={y}
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
