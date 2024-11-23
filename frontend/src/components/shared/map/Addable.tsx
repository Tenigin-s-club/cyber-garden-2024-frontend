import { useDraggable } from "@dnd-kit/core";
import { Card } from "./Map";

export const Addable = ({ card }: { card: Card }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.id,
  });

  return (
    <div
      className="box-content p-2.5 rounded border-chocolate border solid bg-bisque text-black cursor-grab"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    />
  );
};
