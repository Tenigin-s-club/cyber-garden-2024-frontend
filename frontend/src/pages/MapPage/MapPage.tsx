import { ReactInfiniteCanvasHandle } from "react-infinite-canvas";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  Over,
  UniqueIdentifier,
  useDraggable,
} from "@dnd-kit/core";
import { useRef, useState } from "react";
import { ClientRect, Coordinates, Translate } from "@dnd-kit/core/dist/types";
import { CELL_SIZE } from "@/lib/constants/size";
import { AddingFurnite, MapSidebar } from "@/components/shared/MapSidebar";
import { InfiniteCanvas } from "@/components/shared/InfiniteCanvas";
import { itemColor } from "@/components/shared/SidebarItem";
import { cn } from "@/lib/utils";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import Container from "@/components/ui/container";

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

const Map = () => {
  const canvasRef = useRef<ReactInfiniteCanvasHandle>();

  const [activeItem, setActiveItem] = useState<null | AddingFurnite>(null);
  const [startData, setStartData] = useState<AddingFurnite[]>([
    {
      id: 1,
      x: 0,
      y: 0,
      size_y: 5,
      size_x: 2,
      name: "Велодорожка",
      floor_id: 0,
    },
    {
      id: 2,
      x: 0,
      y: 0,
      size_y: 2,
      size_x: 2,
      name: "Стол",
      floor_id: 0,
    },
    {
      x: 150,
      y: 100,
      id: 100000,
      size_x: 2,
      size_y: 2,
      name: "test",
      floor_id: 0,
    },
    {
      x: 210,
      y: 100,
      id: 10,
      size_x: 2,
      size_y: 2,
      name: "test",
      floor_id: 0,
    },
    {
      x: 180,
      y: 20,
      id: 100,
      size_x: 2,
      size_y: 5,
      name: "test",
      floor_id: 0,
    },
    {
      x: 250,
      y: 40,
      id: 1000,
      size_x: 1,
      size_y: 2,
      name: "test",
      floor_id: 0,
    },
    {
      x: 300,
      y: 40,
      id: 10000,
      size_x: 1,
      size_y: 2,
      name: "test",
      floor_id: 0,
    },
  ]);
  const [mapItems, setMapItems] = useState<AddingFurnite[][]>([[]]);

  const addDraggedTrayCardToCanvas = ({
    over,
    active,
    delta,
  }: DragEndEvent) => {
    setActiveItem(null);
    if (!over?.id.toString().includes("canvas")) {
      setStartData((prev) => (activeItem ? [...prev, activeItem] : prev));
      return;
    }

    if (
      !active ||
      !active.rect ||
      !active.rect.current ||
      !active.rect.current.initial ||
      !activeItem
    )
      return;

    if (
      mapItems[Number(over.id.toString().split("_").at(-1))].find(
        (card) =>
          active.rect.current.initial &&
          card.x ===
            calculateCanvasPosition(active.rect.current.initial, over, delta)
              .x &&
          card.y ===
            calculateCanvasPosition(active.rect.current.initial, over, delta).y
      )
    ) {
      return;
    }
    setStartData((prev) => prev.filter((el) => el.id !== active.id));
    setMapItems((prev) => ({
      ...prev,
      [activeItem.floor_id]: [
        ...(prev[activeItem.floor_id] || []), // Инициализируем массив, если он не существует
        {
          ...activeItem,
          x:
            calculateCanvasPosition(active.rect.current.initial!, over, delta)
              .x -
            (calculateCanvasPosition(active.rect.current.initial!, over, delta)
              .x %
              CELL_SIZE),
          y:
            calculateCanvasPosition(active.rect.current.initial!, over, delta)
              .y -
            (calculateCanvasPosition(active.rect.current.initial!, over, delta)
              .y %
              CELL_SIZE),
        },
      ],
    }));
  };

  const { transform, setNodeRef } = useDraggable({
    id: activeItem ? activeItem.id : 0,
  });

  return (
    <Container>
      <DndContext
        modifiers={[snapCenterToCursor]}
        onDragStart={async ({ active }) => {
          canvasRef.current?.fitContentToView({
            scale: 1,
            duration: 150,
          });
          setTimeout(() => {
            setActiveItem(startData.find((el) => el.id === active.id) || null);
            setStartData((prev) => prev.filter((el) => el.id !== active.id));
          }, 150);
        }}
        onDragEnd={addDraggedTrayCardToCanvas}
      >
        <MapSidebar furnites={startData} />
        <div ref={setNodeRef} className="relative">
          <InfiniteCanvas
            canvasRef={canvasRef}
            firstCards={startData}
            setFirstCards={setStartData}
            mapItems={mapItems}
            setMapItems={setMapItems}
          />
        </div>
        <DragOverlay>
          {(() => {
            console.log(activeItem);
            if (!activeItem) return;
            return (
              <div
                className={cn(
                  "box-border rounded text-black cursor-grab text-center",
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
              ></div>
            );
          })()}
        </DragOverlay>
      </DndContext>
    </Container>
  );
};
export default Map;
