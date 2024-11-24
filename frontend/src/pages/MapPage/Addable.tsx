import { useDraggable } from "@dnd-kit/core";
import { Card } from "./MapPage";

export const Addable = ({ card }: { card: Card }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.id,
  });
  return (
    <div
      style={{
        width: `${card.size_x}rem`,
        height: `${card.size_y}rem`,
      }}
      className="trayCard"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {card.name}
    </div>
  );
};
