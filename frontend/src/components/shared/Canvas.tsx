import { Card } from "@/pages/Map";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core/dist/types";
import { useMemo, useRef, useState } from "react";
import { Draggable } from "./Draggable";
import { createSnapModifier } from "@dnd-kit/modifiers";

export const Canvas = ({
  cards,
  setCards,
}: {
  cards: Card[];
  setCards: (cards: Card[]) => void;
}) => {
  const [gridSize] = useState(20);
  const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

  const updateDraggedCardPosition = ({ delta, active }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;

    setCards(
      cards.map((card) => {
        if (card.id === active.id) {
          return {
            ...card,
            coordinates: {
              x: card.coordinates.x + delta.x,
              y: card.coordinates.y + delta.y,
            },
          };
        }
        return card;
      })
    );
  };

  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  const canvasRef = useRef<HTMLDivElement | null>(null);

  const updateAndForwardRef = (div: HTMLDivElement) => {
    canvasRef.current = div;
    setNodeRef(div);
  };

  // create the d3 zoom object, and useMemo to retain it for rerenders

  // update the transform when d3 zoom notifies of a change

  return (
    <div
      ref={updateAndForwardRef}
      className="overflow-hidden rounded border border-chocolate bg-snow"
    >
      <div
        className="canvas"
        style={{
          // apply the transform from d3
          transformOrigin: "top left",
          position: "relative",
          height: "300px",
        }}
      >
        <DndContext
          modifiers={[snapToGrid]}
          onDragEnd={updateDraggedCardPosition}
        >
          {cards.map((card) => (
            <Draggable card={card} key={card.id} />
          ))}
        </DndContext>
      </div>
    </div>
  );
};
