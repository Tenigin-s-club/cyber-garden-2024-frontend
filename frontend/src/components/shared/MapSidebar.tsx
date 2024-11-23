import { FC } from "react";
import { itemColor, SidebarItem } from "./SidebarItem";

export type AddingFurnite = {
  x: number;
  y: number;
  id: number;
  size_x: number;
  size_y: number;
  name: string;
};

interface MapSidebarProps {
  furnites: AddingFurnite[];
}

export const MapSidebar: FC<MapSidebarProps> = ({ furnites }) => {
  return (
    <div className="flex p-5 flex-col gap-4 w-2/6">
      <div className="border border-gray-200 relative p-2 flex flex-col gap-5 rounded-xl">
        <span className="-top-4 left-4 absolute bg-white  pl-4 pr-4">
          Мебель
        </span>
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
