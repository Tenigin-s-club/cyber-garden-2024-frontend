import { useDraggable } from "@dnd-kit/core";
import { AddingFurnite } from "./MapSidebar";
import { CELL_SIZE } from "@/lib/constants/size";
import { cn } from "@/lib/utils";
import { itemColor } from "./SidebarItem";

export const Draggable = ({ card }: { card: AddingFurnite }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.id,
  });

  return (
    <div
      key={`${card.id}`}
      style={{
        zIndex: 100,
        width: CELL_SIZE * card.size_x,
        height: CELL_SIZE * card.size_y,
        top: card.y,
        left: card.x,
      }}
      id={`${card.id}`}
      className={cn(
        itemColor[Number(card.id.toString().split("_")[0]) % itemColor.length],
        "box-border absolute rounded cursor-grab"
      )}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    />
  );
};
