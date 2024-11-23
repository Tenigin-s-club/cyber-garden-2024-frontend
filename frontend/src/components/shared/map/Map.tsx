import {
  ClientRect,
  DndContext,
  DragOverlay,
  Over,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { Coordinates, DragEndEvent, Translate } from "@dnd-kit/core/dist/types";
import { ZoomTransform, zoomIdentity } from "d3-zoom";
import { useState } from "react";
import { Addable } from "./Addable";
import { Canvas } from "./Canvas";

export type Card = {
  id: UniqueIdentifier;
  x: number;
  y: number;
  name: string;
};

const trayCards = [
  // the coordinates aren't used for the tray cards, we could create a new type without them
  { id: "World", x: 0, y: 0, name: "World" },
  { id: "Fizz", x: 0, y: 0, name: "Fizz" },
  { id: "Buzz", x: 0, y: 0, name: "Buzz" },
];

const calculateCanvasPosition = (
  initialRect: ClientRect,
  over: Over,
  delta: Translate,
  transform: ZoomTransform
): Coordinates => ({
  x:
    (initialRect.left + delta.x - (over?.rect?.left ?? 0) - transform.x) /
    transform.k,
  y:
    (initialRect.top + delta.y - (over?.rect?.top ?? 0) - transform.y) /
    transform.k,
});

export const Map = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: "Hello", x: 0, y: 0, name: "Hello" },
  ]);

  const [draggedTrayCardId, setDraggedTrayCardId] =
    useState<UniqueIdentifier | null>(null);

  // store the current transform from d3
  const [transform, setTransform] = useState(zoomIdentity);

  const addDraggedTrayCardToCanvas = ({
    over,
    active,
    delta,
  }: DragEndEvent) => {
    setDraggedTrayCardId(null);

    if (over?.id !== "canvas") return;
    if (!active.rect.current.initial) return;

    setCards([
      ...cards,
      {
        id: active.id,
        x: calculateCanvasPosition(
          active.rect.current.initial,
          over,
          delta,
          transform
        ).x,
        y: calculateCanvasPosition(
          active.rect.current.initial,
          over,
          delta,
          transform
        ).y,
        name: active.id.toString(),
      },
    ]);
  };

  return (
    <DndContext
      onDragStart={({ active }) => setDraggedTrayCardId(active.id)}
      onDragEnd={addDraggedTrayCardToCanvas}
    >
      <div className="flex mb-2 flex-wrap">
        {trayCards.map((trayCard) => {
          if (cards.find((card) => card.id === trayCard.id)) return null;

          return <Addable card={trayCard} key={trayCard.id} />;
        })}
      </div>
      <Canvas
        cards={cards}
        setCards={setCards}
        transform={transform}
        setTransform={setTransform}
      />
      <DragOverlay>
        <div
          style={{
            transformOrigin: "top left",
            transform: `scale(${transform.k})`,
          }}
          className="box-content p-2.5 rounded border-chocolate border solid bg-bisque text-black cursor-grab"
        >
          {/* this works because the id of the card is the same as the text in this example so we can just render the id inside a div. In more complex cases you would have a component to render the card, and use that here. */}
          {draggedTrayCardId}
        </div>
      </DragOverlay>
    </DndContext>
  );
};
