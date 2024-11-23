import {
  ReactInfiniteCanvas,
  ReactInfiniteCanvasHandle,
} from "react-infinite-canvas";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core/dist/types";
import { select } from "d3-selection";
import { ZoomTransform, zoom } from "d3-zoom";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { Card } from "./Map";
import { Draggable } from "./Draggable";

export const Canvas = ({
  cards,
  setCards,
  transform,
  setTransform,
}: {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  transform: ZoomTransform;
  setTransform(transform: ZoomTransform): void;
}) => {
  const updateDraggedCardPosition = ({ delta, active }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;

    setCards(
      cards.map((card) => {
        if (card.id === active.id) {
          return {
            ...card,
            x: card.x + delta.x / transform.k,
            y: card.y + delta.y / transform.k,
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
  const zoomBehavior = useMemo(() => zoom<HTMLDivElement, unknown>(), []);

  // update the transform when d3 zoom notifies of a change
  const updateTransform = useCallback(
    ({ transform }: { transform: ZoomTransform }) => {
      setTransform(transform);
    },
    [setTransform]
  );

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    // get transform change notifications from d3 zoom
    zoomBehavior.on("zoom", updateTransform);

    // attach d3 zoom to the canvas div element, which will handle
    // mousewheel, gesture and drag events automatically for pan / zoom
    select<HTMLDivElement, unknown>(canvasRef.current).call(zoomBehavior);
  }, [zoomBehavior, canvasRef, updateTransform]);

  return (
    <ReactInfiniteCanvas
      ref={updateAndForwardRef}
      className="overflow-hidden rounded border-chocolate border bg-snow"
      style={{ position: "relative" }}
    >
      <div
        className="grid-background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(#f1f1f1 1px, transparent 1px), linear-gradient(90deg, #f1f1f1 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none", // Ensure the grid does not interfere with interactions
        }}
      />
      <div
        className="canvas"
        style={{
          // apply the transform from d3
          transformOrigin: "top left",
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.k})`,
          position: "relative",
          height: "300px",
        }}
      >
        <DndContext onDragEnd={updateDraggedCardPosition}>
          {cards.map((card) => (
            <Draggable card={card} key={card.id} canvasTransform={transform} />
          ))}
        </DndContext>
      </div>
    </ReactInfiniteCanvas>
  );
};
