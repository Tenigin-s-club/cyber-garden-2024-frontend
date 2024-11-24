import {
  DndContext,
  DragEndEvent,
  Over,
  UniqueIdentifier,
  useDraggable,
} from "@dnd-kit/core";
import { useRef, useState } from "react";
import { ClientRect, Coordinates, Translate } from "@dnd-kit/core/dist/types";
import { CELL_SIZE } from "@/lib/constants/size";
import { AddingFurnite, MapSidebar } from "@/components/shared/MapSidebar";
import { InfiniteCanvas } from "@/components/shared/InfiniteCanvas";

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
    (over?.rect?.left ?? 0 - ((over?.rect?.left ?? 0) % CELL_SIZE)),
  y:
    initialRect.top +
    delta.y -
    (over?.rect?.top ?? 0 - ((over?.rect?.top ?? 0) % CELL_SIZE)),
});

const MapPage = () => {
  const [gridSize] = useState(CELL_SIZE);
  const [activeItem, setActiveItem] = useState<null | AddingFurnite>(null);
  const [startData, setStartData] = useState<AddingFurnite[]>([
    {
      id: 1,
      x: 0,
      y: 0,
      size_y: 2,
      size_x: 1,
      name: "Кровать",
      floor_id: 0,
    },
  ]);
  const [mapItems, setMapItems] = useState<AddingFurnite[]>([]);

  const addDraggedTrayCardToCanvas = ({
    over,
    active,
    delta,
  }: DragEndEvent) => {
    if (over?.id !== "canvas") return;
    if (!active.rect.current.initial || !activeItem) return;
    if (
      activeItem.x + delta.x < 0 ||
      activeItem.x + delta.x > (canvasRef.current?.clientWidth || 0) ||
      activeItem.y + delta.y < 0 ||
      activeItem.y + delta.y > (canvasRef.current?.clientHeight || 0)
    ) {
      setStartData((prev) => [...prev, { ...activeItem, x: 0, y: 0 }]);
      return;
    }

    if (
      mapItems.find(
        (card) =>
          active.rect.current.initial &&
          card.x ===
            calculateCanvasPosition(active.rect.current.initial, over, delta)
              .x &&
          card.y ===
            calculateCanvasPosition(active.rect.current.initial, over, delta).y
      )
    )
      return;
    setStartData((prev) => prev.filter((el) => el.id !== active.id));
    setMapItems((prev) =>
      active.rect.current.initial && activeItem?.size_x
        ? [
            ...prev,
            {
              ...activeItem,
              ...calculateCanvasPosition(
                active.rect.current.initial,
                over,
                delta
              ),
              id: Number(active.id),
            },
          ]
        : prev
    );
  };

  return (
    <>
      <DndContext
        onDragStart={({ active }) => {
          setActiveItem(startData.find((el) => el.id === active.id) || null);
          setStartData((prev) => prev.filter((el) => el.id !== active.id));
        }}
        onDragEnd={addDraggedTrayCardToCanvas}
      >
        <MapSidebar furnites={startData} />
        <InfiniteCanvas />
      </DndContext>
    </>
  );
};

export default MapPage;
