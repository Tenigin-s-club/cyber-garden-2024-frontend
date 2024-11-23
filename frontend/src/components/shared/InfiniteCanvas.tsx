import { CELL_SIZE } from "@/lib/constants/size";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useDraggable,
} from "@dnd-kit/core";
import { useRef, useState } from "react";
import {
  ReactInfiniteCanvas,
  ReactInfiniteCanvasHandle,
} from "react-infinite-canvas";
import { Draggable } from "./Draggable";
import { itemColor } from "./SidebarItem";
import { AddingFurnite } from "./MapSidebar";

export const InfiniteCanvas = () => {
  const canvasRef = useRef<ReactInfiniteCanvasHandle>();
  const [activeItem, setActiveItem] = useState<null | AddingFurnite>(null);
  const [, setFirstCards] = useState<AddingFurnite[]>([
    {
      id: 1,
      x: 0,
      y: 0,
      size_y: 2,
      size_x: 1,
      name: "Кровать",
      floor_id: 0,
    },
    {
      id: 2,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 1,
      name: "табуретка",
      floor_id: 0,
    },
    {
      id: 3,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 2,
      name: "бильярдный стол",
      floor_id: 0,
    },
    {
      id: 7,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 1,
      name: "табуретка",
      floor_id: 0,
    },
    {
      id: 8,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 2,
      name: "бильярдный стол",
      floor_id: 0,
    },
    {
      id: 9,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 1,
      name: "табуретка",
      floor_id: 0,
    },
    {
      id: 10,
      x: 0,
      y: 0,
      size_y: 1,
      size_x: 2,
      name: "бильярдный стол",
      floor_id: 0,
    },
    {
      id: 4,
      x: 0,
      y: 0,
      size_y: 2,
      size_x: 2,
      name: "стол для покера",
      floor_id: 0,
    },
    {
      id: 6,
      x: 0,
      y: 0,
      size_y: 2,
      size_x: 2,
      name: "подиум для стриптизерши",
      floor_id: 0,
    },
    {
      id: 5,
      x: 0,
      y: 0,
      size_y: 5,
      size_x: 2,
      name: "хз, гроб",
      floor_id: 0,
    },
  ]);
  const [mapItems, setMapItems] = useState<Record<string, AddingFurnite[]>>({
    0: [
      {
        x: 100,
        y: 40,
        id: 100000,
        size_x: 1,
        size_y: 2,
        name: "test",
        floor_id: 0,
      },
      {
        x: 150,
        y: 40,
        id: 10,
        size_x: 1,
        size_y: 2,
        name: "test",
        floor_id: 0,
      },
      {
        x: 200,
        y: 40,
        id: 100,
        size_x: 1,
        size_y: 2,
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
    ],
    1: [
      {
        x: 200,
        y: 200,
        id: 6,
        size_x: 3,
        size_y: 3,
        name: "test",
        floor_id: 1,
      },
    ],
    C: [],
  });

  const { transform } = useDraggable({
    id: activeItem ? activeItem.id : 0,
  });

  const updateDraggedCardPosition = ({ delta }: DragEndEvent) => {
    if ((!delta.x && !delta.y) || !activeItem) return;
    if (
      activeItem.x + delta.x < 0 ||
      activeItem.x + delta.x > 20 * CELL_SIZE ||
      activeItem.y + delta.y < 0 ||
      activeItem.y + delta.y > 30 * CELL_SIZE
    ) {
      setFirstCards((prev) => [...prev, { ...activeItem, x: 0, y: 0 }]);
      return;
    }
    setMapItems((prev) => ({
      ...prev,
      [activeItem.floor_id]: [
        ...prev[activeItem.floor_id].filter((el) => el.id !== activeItem.id),
        {
          ...activeItem,
          x:
            activeItem.x + delta.x >= 0 ? activeItem.x + delta.x : activeItem.x,
          y:
            activeItem.y + delta.y >= 0 ? activeItem.y + delta.y : activeItem.y,
        },
      ],
    }));
  };

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          border: "1px solid #ccc",
          position: "relative",
        }}
      >
        <ReactInfiniteCanvas
          ref={canvasRef}
          onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
            mountFunc.fitContentToView({ scale: 1 });
          }}
          customComponents={[
            {
              component: (
                <button
                  onClick={() => {
                    canvasRef.current?.fitContentToView({ scale: 1 });
                  }}
                >
                  fitToView
                </button>
              ),
              position: 0,
              offset: { x: 0, y: 0 },
            },
          ]}
        >
          <div className="absolute">
            {Object.keys(mapItems).map((el, index) => (
              <DndContext
                onDragStart={({ active }) => {
                  setActiveItem(
                    mapItems[el].find((q) => q.id === active.id) || null
                  );
                  setMapItems((prev) => ({
                    ...prev,
                    el: prev[el].filter(
                      (item) => item.id !== Number(active.id)
                    ),
                  }));
                }}
                onDragEnd={updateDraggedCardPosition}
              >
                <div
                  style={{
                    width: 30 * CELL_SIZE,
                    height: 20 * CELL_SIZE,
                    border: "1px solid",
                    position: "relative",
                    marginBottom: 3 * CELL_SIZE,
                  }}
                >
                  <span className="top-0 left-0 absolute p-3 text-sm bg-slate-200">
                    Этаж {index + 1}
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
                        console.log(activeItem);
                        if (!activeItem) return;
                        return (
                          <div
                            className={cn(
                              "box-border rounded text-black cursor-grab text-center",
                              itemColor[
                                Number(
                                  activeItem?.id?.toString().split("_")[0]
                                ) % itemColor.length
                              ]
                            )}
                            style={{
                              top: `${
                                CELL_SIZE * activeItem.size_x - 1000
                              } !important`,
                              left: CELL_SIZE * activeItem.size_y - 1000,
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
                          >
                            x: {activeItem.x}, y: {activeItem.y}
                          </div>
                        );
                      })()}
                    </DragOverlay>
                    {mapItems[el].map((card) => (
                      <Draggable card={card} key={card.id} />
                    ))}
                  </div>
                </div>
              </DndContext>
            ))}
          </div>
          <button
            onClick={() => {
              let rId = Math.floor(Math.random() * 100000);
              while (rId in mapItems) {
                rId = Math.floor(Math.random() * 100000);
              }
              mapItems[rId] = [];
            }}
            style={{ width: CELL_SIZE * 30, height: CELL_SIZE * 5 }}
            className="text-8xl border border-stone-300"
          >
            +
          </button>
        </ReactInfiniteCanvas>
      </div>
    </>
  );
};
