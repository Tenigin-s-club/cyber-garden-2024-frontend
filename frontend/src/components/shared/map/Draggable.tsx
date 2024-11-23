import { useDraggable } from "@dnd-kit/core";
import { ZoomTransform } from "d3-zoom";
import { Card } from "./Map";

export const Draggable = ({
  card,
  canvasTransform,
}: {
  card: Card;
  canvasTransform: ZoomTransform;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  return (
    <div
      className="box-content p-2.5 rounded border-chocolate border solid bg-bisque text-black cursor-grab"
      style={{
        position: "absolute",
        top: `${card.y * canvasTransform.k}px`,
        left: `${card.x * canvasTransform.k}px`,
        transformOrigin: "top left",
        ...(transform
          ? {
              // temporary change to this position when dragging
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${canvasTransform.k})`,
            }
          : {
              // zoom to canvas zoom
              transform: `scale(${canvasTransform.k})`,
            }),
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      // this stops the event bubbling up and triggering the canvas drag
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e);
        e.preventDefault();
      }}
    />
  );
};
