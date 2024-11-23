import { Card } from "@/pages/MapPage";
import { useDraggable } from "@dnd-kit/core";

export const Addable = ({ card }: { card: Card }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.id,
  });

  return (
    <div
      className="box-border border border-chocolate rounded bg-bisque text-black cursor-grab w-5 h-5 bg-red-500"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    ></div>
  );
};
