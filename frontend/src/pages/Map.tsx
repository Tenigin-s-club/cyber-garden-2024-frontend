import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  Over,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { createSnapModifier } from "@dnd-kit/modifiers";
import { ClientRect, Coordinates, Translate } from "@dnd-kit/core/dist/types";
import { Addable } from "@/components/shared/Addable";
import { Canvas } from "@/components/shared/Canvas";
export type Card = {
  id: UniqueIdentifier;
  coordinates: Coordinates;
  text: string;
};

const calculateCanvasPosition = (
  initialRect: ClientRect,
  over: Over,
  delta: Translate
): Coordinates => ({
  x:
    initialRect.left +
    delta.x -
    (over?.rect?.left ?? 0 - ((over?.rect?.left ?? 0) % 20)),
  y:
    initialRect.top +
    delta.y -
    (over?.rect?.top ?? 0 - ((over?.rect?.left ?? 0) % 20)),
});

const trayCards = [
  // the coordinates aren't used for the tray cards, we could create a new type without them
  { id: "World", coordinates: { x: 0, y: 0 }, text: "World" },
  { id: "Fizz", coordinates: { x: 0, y: 0 }, text: "Fizz" },
  { id: "Buzz", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "123", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buz3z", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz4", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz515", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz525", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz535", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz545", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz555", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz565", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz575", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz585", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz586", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz581", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz58q", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz58w", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz58e", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz58r", coordinates: { x: 0, y: 0 }, text: "Buzz" },
  { id: "Buzz58t", coordinates: { x: 0, y: 0 }, text: "Buzz" },
];

export const Map = () => {
  const [gridSize] = useState(20);
  const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

  const [mapItems, setMapItems] = useState<Card[]>([]);
  const [_, setDraggedTrayCardId] = useState<UniqueIdentifier | null>(null);

  const addDraggedTrayCardToCanvas = ({
    over,
    active,
    delta,
  }: DragEndEvent) => {
    setDraggedTrayCardId(null);

    if (over?.id !== "canvas") return;
    if (!active.rect.current.initial) return;

    setMapItems([
      ...mapItems,
      {
        id: active.id,
        coordinates: calculateCanvasPosition(
          active.rect.current.initial,
          over,
          delta
        ),
        text: active.id.toString(),
      },
    ]);
  };

  return (
    <DndContext
      onDragStart={({ active }) => setDraggedTrayCardId(active.id)}
      modifiers={[snapToGrid]}
      onDragEnd={addDraggedTrayCardToCanvas}
    >
      <div className="box-content p-2 border border-chocolate rounded bg-bisque text-black cursor-grab size-5 text-center">
        {trayCards.map((trayCard) => {
          // this line removes the card from the tray if it's already on the canvas
          if (mapItems.find((card) => card.id === trayCard.id)) return null;

          return <Addable card={trayCard} key={trayCard.id} />;
        })}
      </div>

      <Canvas cards={mapItems} setCards={setMapItems} />
      <DragOverlay>
        <div className="box-border border border-chocolate rounded bg-bisque text-black cursor-grab text-center size-4 text-base bg-red-500" />
      </DragOverlay>
    </DndContext>
  );
};
