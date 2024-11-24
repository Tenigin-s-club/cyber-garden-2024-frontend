import { Draggable } from "@/components/shared/Draggable";
import { AddingFurnite } from "@/components/shared/MapSidebar";
import { itemColor } from "@/components/shared/SidebarItem";
import { CELL_SIZE } from "@/lib/constants/size";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { useRef, useState } from "react";

export const Area = ({
  id,
  setMapCards,
  mapCards,
}: {
  id: number;
  setFirstCards: React.Dispatch<React.SetStateAction<AddingFurnite[]>>;
  setMapCards: React.Dispatch<React.SetStateAction<AddingFurnite[][]>>;
  firstCards: AddingFurnite[];
  mapCards: AddingFurnite[][];
}) => {
  const [activeItem, setActiveItem] = useState<null | AddingFurnite>(null);
  const { setNodeRef } = useDroppable({
    id: `canvas_area_${id}`,
  });

  const updateDraggedCardPosition = ({ delta, over }: DragEndEvent) => {
    console.log(delta, activeItem);
    if ((!delta.x && !delta.y) || !activeItem) return;
    console.log(over);
    setMapCards((prev: AddingFurnite[][]) => ({
      ...prev,
      [activeItem.floor_id]: [
        ...prev[activeItem.floor_id].filter(
          (el: AddingFurnite) => el.id !== activeItem.id
        ),
        {
          ...activeItem,
          x: activeItem.x + delta.x - ((activeItem.x + delta.x) % 20),
          y: activeItem.y + delta.y - ((activeItem.y + delta.y) % 20),
        },
      ],
    }));
  };

  const { transform } = useDraggable({
    id: activeItem ? activeItem.id : 0,
  });

  const gt = useDroppable({
    id: `canvas_${id}`,
  });

  const canvasRef = useRef<HTMLDivElement | null>(null);

  const updateAndForwardRef = (div: HTMLDivElement) => {
    canvasRef.current = div;
    gt.setNodeRef(div);
  };

  return (
    <div ref={setNodeRef} className="relative">
      <div
        style={{
          width: 30 * CELL_SIZE,
          height: 20 * CELL_SIZE,
          border: "1px solid",
          position: "relative",
          marginBottom: 3 * CELL_SIZE,
        }}
      >
        <DndContext
          onDragStart={({ active }) => {
            setActiveItem(mapCards[id].find((q) => q.id === active.id) || null);
          }}
          onDragEnd={updateDraggedCardPosition}
        >
          <div ref={updateAndForwardRef}>
            <span className="top-0 left-0 absolute p-3 text-sm bg-slate-200">
              Этаж {id + 1}
            </span>
            <div
              className="canvas"
              style={{
                transformOrigin: "top left",
                position: "relative",
                height: "100%",
              }}
            >
              <DragOverlay>
                {(() => {
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
                    />
                  );
                })()}
              </DragOverlay>
              {mapCards[id] &&
                mapCards[id].map((card) => (
                  <Draggable card={card} key={card.id} />
                ))}
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
};
