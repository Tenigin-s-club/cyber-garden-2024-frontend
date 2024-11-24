import { ReactInfiniteCanvasHandle } from "react-infinite-canvas";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  Over,
  UniqueIdentifier,
  useDraggable,
} from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { ClientRect, Coordinates, Translate } from "@dnd-kit/core/dist/types";
import { CELL_SIZE } from "@/lib/constants/size";
import { AddingFurnite, MapSidebar } from "@/components/shared/MapSidebar";
import { InfiniteCanvas } from "@/components/shared/InfiniteCanvas";
import { itemColor } from "@/components/shared/SidebarItem";
import { cn } from "@/lib/utils";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import Container from "@/components/ui/container";
import { requestFloors, requestFurniture } from "@/services/Map/map";
import { useParams } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(false);
  const [mapItems, setMapItems] = useState<
    { office_id: number; name: string; id: number; items: AddingFurnite[] }[]
  >([]);
  const [startItems, setStartItems] = useState<
    {
      name: string;
      size_x: number;
      size_y: number;
      id: number;
    }[]
  >([]);
  const { id = "" } = useParams();
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const floorsRes = await requestFloors(id);
      setMapItems(
        floorsRes.data.map(
          (el: { office_id: number; name: string; id: number }) => ({
            ...el,
            items: [],
          })
        )
      );
      const furnRes = await requestFurniture(id);
      setStartItems(
        furnRes.data.map(
          (el: { name: string; size_x: number; size_y: number; id: number }) =>
            el
        )
      );
    })();
    setIsLoading(false);
  }, [id]);
  const [activeItem, setActiveItem] = useState<null | AddingFurnite>(null);

  const addDraggedTrayCardToCanvas = ({
    over,
    active,
    delta,
  }: DragEndEvent) => {
    setActiveItem(null);
    if (!over?.id.toString().includes("canvas")) {
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
    console.log(
      mapItems
        .find((el) => el.id === Number(over.id.toString().split("_").at(-1)))
        ?.items.find(
          (card) =>
            active.rect.current.initial &&
            card.x ===
              calculateCanvasPosition(active.rect.current.initial, over, delta)
                .x &&
            card.y ===
              calculateCanvasPosition(active.rect.current.initial, over, delta)
                .y
        )
    );
    if (
      mapItems
        .find((el) => el.id === Number(over.id.toString().split("_").at(-1)))
        ?.items.find(
          (card) =>
            active.rect.current.initial &&
            card.x ===
              calculateCanvasPosition(active.rect.current.initial, over, delta)
                .x &&
            card.y ===
              calculateCanvasPosition(active.rect.current.initial, over, delta)
                .y
        )
    ) {
      return;
    }
    console.log(
      over.id.toString().split("_"),
      [
        ...mapItems.filter(
          (el) => el.id !== Number(over.id.toString().split("_").at(-1))
        ),
        {
          ...mapItems[
            mapItems.findIndex(
              (el) => el.id === Number(over.id.toString().split("_").at(-1))
            )
          ],
          items: [
            ...(mapItems[
              mapItems.findIndex(
                (el) => el.id === Number(over.id.toString().split("_").at(-1))
              )
            ]?.items ?? []),
            {
              ...activeItem,
              office_id: Number(id),
              items: [],
              x:
                calculateCanvasPosition(
                  active.rect.current.initial!,
                  over,
                  delta
                ).x -
                (calculateCanvasPosition(
                  active.rect.current.initial!,
                  over,
                  delta
                ).x %
                  CELL_SIZE),
              y:
                calculateCanvasPosition(
                  active.rect.current.initial!,
                  over,
                  delta
                ).y -
                (calculateCanvasPosition(
                  active.rect.current.initial!,
                  over,
                  delta
                ).y %
                  CELL_SIZE),
            },
          ],
        },
      ].sort((a, b) => a.id - b.id)
    );
    setMapItems((prev) =>
      [
        ...prev.filter(
          (el) => el.id !== Number(over.id.toString().split("_").at(-1))
        ),
        {
          ...prev[
            prev.findIndex(
              (el) => el.id === Number(over.id.toString().split("_").at(-1))
            )
          ],
          items: [
            ...(prev[
              prev.findIndex(
                (el) => el.id === Number(over.id.toString().split("_").at(-1))
              )
            ]?.items ?? []),
            {
              ...activeItem,
              office_id: Number(id),
              items: [],
              x:
                calculateCanvasPosition(
                  active.rect.current.initial!,
                  over,
                  delta
                ).x -
                (calculateCanvasPosition(
                  active.rect.current.initial!,
                  over,
                  delta
                ).x %
                  CELL_SIZE),
              y:
                calculateCanvasPosition(
                  active.rect.current.initial!,
                  over,
                  delta
                ).y -
                (calculateCanvasPosition(
                  active.rect.current.initial!,
                  over,
                  delta
                ).y %
                  CELL_SIZE),
            },
          ],
        },
      ].sort((a, b) => a.id - b.id)
    );
  };

  const { transform, setNodeRef } = useDraggable({
    id: activeItem ? activeItem.id : 0,
  });

  if (isLoading) return "Загрузка...";

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
            setActiveItem(
              startItems.find((el) => el.id === active.id)
                ? {
                    ...startItems.find((el) => el.id === active.id)!,
                    x: 0,
                    y: 0,
                    type: 0,
                    name: "",
                  }
                : null
            );
          }, 150);
        }}
        onDragEnd={addDraggedTrayCardToCanvas}
      >
        <MapSidebar furnites={startItems} />
        <div ref={setNodeRef} className="relative">
          <InfiniteCanvas
            canvasRef={canvasRef}
            firstCards={startItems}
            setFirstCards={setStartItems}
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
