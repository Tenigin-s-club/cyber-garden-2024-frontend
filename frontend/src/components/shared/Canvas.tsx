import { DragEndEvent } from "@dnd-kit/core/dist/types";
import { useMemo, useState } from "react";
import { Draggable } from "./Draggable";
import { createSnapModifier } from "@dnd-kit/modifiers";
import { CELL_SIZE } from "@/lib/constants/size";
import { AddingFurnite } from "./MapSidebar";
import { cn } from "@/lib/utils";
import { itemColor } from "./SidebarItem";
import { DndContext, DragOverlay } from "@dnd-kit/core";

export const Canvas = ({
  cards,
  setCards,
  setFirstCards,
  updateAndForwardRef,
  canvasRef,
}: {
  cards: AddingFurnite[];
  canvasRef: React.MutableRefObject<HTMLDivElement | null>;
  updateAndForwardRef: (div: HTMLDivElement) => void;
  setCards: React.Dispatch<React.SetStateAction<AddingFurnite[]>>;
  setFirstCards: React.Dispatch<React.SetStateAction<AddingFurnite[]>>;
}) => {
  const [gridSize] = useState(CELL_SIZE);
  const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);
  const [activeItem, setActiveItem] = useState<null | AddingFurnite>(null);

  const updateDraggedCardPosition = ({ delta }: DragEndEvent) => {
    console.log(delta, activeItem);
    if ((!delta.x && !delta.y) || !activeItem) return;
    console.log(
      activeItem.x + delta.x,
      activeItem.y + delta.y,
      canvasRef.current?.clientWidth || 0,
      canvasRef.current?.clientHeight || 0
    );
    if (
      activeItem.x + delta.x < 0 ||
      activeItem.x + delta.x > (canvasRef.current?.clientWidth || 0) ||
      activeItem.y + delta.y < 0 ||
      activeItem.y + delta.y > (canvasRef.current?.clientHeight || 0)
    ) {
      setFirstCards((prev) => [...prev, { ...activeItem, x: 0, y: 0 }]);
      return;
    }
    setCards((prev) => [
      ...prev,
      {
        ...activeItem,
        x: activeItem.x + delta.x >= 0 ? activeItem.x + delta.x : activeItem.x,
        y: activeItem.y + delta.y >= 0 ? activeItem.y + delta.y : activeItem.y,
      },
    ]);
  };

  return (
    <div
      ref={updateAndForwardRef}
      className="overflow-hidden rounded border border-chocolate bg-snow w-full"
    >
      <div
        className="canvas"
        style={{
          transformOrigin: "top left",
          position: "relative",
          height: "300px",
        }}
      >
        <DndContext
          onDragStart={({ active }) => {
            setActiveItem(cards.find((el) => el.id === active.id) || null);
            setCards((prev) => prev.filter((el) => el.id !== active.id));
          }}
          modifiers={[snapToGrid]}
          onDragEnd={updateDraggedCardPosition}
        >
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
                  }}
                />
              );
            })()}
          </DragOverlay>
          {cards.map((card) => (
            <Draggable card={card} key={card.id} />
          ))}
        </DndContext>
      </div>
    </div>
  );
};
