import { Card } from "@/pages/Map";
import { useDraggable } from "@dnd-kit/core";

export const Draggable = ({ card }: { card: Card }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  return (
    <div
      className="box-border border border-chocolate rounded bg-bisque text-black cursor-grab text-center w-5 h-5 bg-red-500"
      style={{
        position: "absolute",
        top: `${card.coordinates.y}px`,
        left: `${card.coordinates.x}px`,
        transformOrigin: "top left",
        // ...(transform
        //   ? {
        //       // temporary change to this position when dragging
        //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0px)`,
        //     }
        //   : {
        //       // zoom to canvas zoom
        //       transform: ``,
        //     }),
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      // this stops the event bubbling up and triggering the canvas drag
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
    ></div>
  );
};
