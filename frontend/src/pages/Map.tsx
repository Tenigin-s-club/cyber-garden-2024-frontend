import { Draggable } from "@/components/shared/Draggable";
import { Droppable } from "@/components/shared/Droppable";
import { DndContext, DragOverlay, useDraggable } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { createSnapModifier, snapCenterToCursor } from "@dnd-kit/modifiers";

export const Map = () => {
  const [gridSize, setGridSize] = useState(20);
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable id="draggable">
      <div className="size-5 w-20 bg-slate-600 outline-1" />
    </Draggable>
  );
  const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

  return (
    <DndContext
      modifiers={[snapToGrid, snapCenterToCursor]}
      onDragEnd={handleDragEnd}
    >
      {parent === null ? draggableMarkup : null}
      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          <DragOverlay>
            <div className="p-4 border border-333">
              {id}: my pussy is {parent === id ? draggableMarkup : ""} free now
            </div>
          </DragOverlay>
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event: { over: any }) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};
