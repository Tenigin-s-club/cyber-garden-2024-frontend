import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  Over,
  UniqueIdentifier,
  useDraggable,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { createSnapModifier } from "@dnd-kit/modifiers";
import { ClientRect, Coordinates, Translate } from "@dnd-kit/core/dist/types";
import { Canvas } from "@/components/shared/Canvas";
import { CELL_SIZE } from "@/lib/constants/size";
import { AddingFurnite, MapSidebar } from "@/components/shared/MapSidebar";
import { cn } from "@/lib/utils";
import { itemColor } from "@/components/shared/SidebarItem";
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
    (over?.rect?.top ?? 0 - ((over?.rect?.left ?? 0) % CELL_SIZE)),
});

const MapPage = () => {
  const [gridSize] = useState(CELL_SIZE);
  const [activeItem, setActiveItem] = useState<null | AddingFurnite>(null);
  const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);
  const [firstData, setFirstData] = useState<AddingFurnite[]>([
    {
      id: 1,
      x: 0,
      y: 0,
      size_y: 2,
      size_x: 1,
      name: "Кровать",
    },
    {
      id: 2,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 1,
      name: "табуретка",
    },
    {
      id: 3,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 2,
      name: "бильярдный стол",
    },
    {
      id: 7,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 1,
      name: "табуретка",
    },
    {
      id: 8,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 2,
      name: "бильярдный стол",
    },
    {
      id: 9,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 1,
      name: "табуретка",
    },
    {
      id: 10,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 2,
      name: "бильярдный стол",
    },
    {
      id: 4,
      x: 0,
      y: 0,
      size_y: 2,
      size_x: 2,
      name: "стол для покера",
    },
    {
      id: 6,
      x: 0,
      y: 0,
      size_y: 2,
      size_x: 2,
      name: "подиум для стриптизерши",
    },
    {
      id: 5,
      x: 0,
      y: 0,
      size_y: 5,
      size_x: 2,
      name: "хз, гроб",
    },
  ]);
  const [mapItems, setMapItems] = useState<AddingFurnite[]>([]);
  const { transform } = useDraggable({
    id: activeItem?.id?.toString() ? activeItem?.id : 0,
  });

  const addDraggedTrayCardToCanvas = ({
    over,
    active,
    delta,
  }: DragEndEvent) => {
    if (over?.id !== "canvas") return;
    if (!active.rect.current.initial) return;
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
    setFirstData((prev) => prev.filter((el) => el.id !== active.id));
    console.log(
      activeItem,
      active.rect.current.initial,
      firstData.find((el) => el.id === active.id),
      !firstData.find((el) => el.id === active.id) &&
        !active.rect.current.initial &&
        !activeItem
        ? mapItems
        : [
            ...mapItems,
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
    );
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
      <h1 className="text-4xl">КОНСТРУКТОР ПЕНИСОВ ОНЛАЙН</h1>
      <DndContext
        onDragStart={({ active }) => {
          setActiveItem(firstData.find((el) => el.id === active.id) || null);
          setFirstData((prev) => prev.filter((el) => el.id !== active.id));
        }}
        modifiers={[snapToGrid]}
        onDragEnd={addDraggedTrayCardToCanvas}
      >
        <div className="flex-row flex">
          <MapSidebar furnites={firstData} />
          <Canvas
            setFirstCards={setFirstData}
            cards={mapItems}
            setCards={setMapItems}
          />
          <DragOverlay dropAnimation={null}>
            {(() => {
              if (!activeItem) return;
              return (
                <div
                  className={cn(
                    "box-border rounded bg-bisque text-black cursor-grab text-center",
                    itemColor[
                      Number(activeItem?.id?.toString().split("_")[0]) %
                        itemColor.length
                    ]
                  )}
                  style={{
                    width: CELL_SIZE * activeItem.size_x,
                    height: CELL_SIZE * activeItem.size_y,
                    ...(transform
                      ? {
                          // temporary change to this position when dragging
                          transform: `translate3d(${transform.x}px, ${transform.y}px, 0px)`,
                        }
                      : {
                          // zoom to canvas zoom
                          transform: ``,
                        }),
                  }}
                />
              );
            })()}
          </DragOverlay>
        </div>
      </DndContext>
    </>
  );
};

export default MapPage;
