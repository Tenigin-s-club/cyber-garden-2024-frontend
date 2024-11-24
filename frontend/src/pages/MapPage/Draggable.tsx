import { useDraggable } from "@dnd-kit/core";
import { ZoomTransform } from "d3-zoom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AssignedEmployeeFurniture } from "@/components/shared/AssignedEmployeeFurniture";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Card } from "./MapPage";

export const Draggable = ({
  card,
  canvasTransform,
}: {
  card: Card;
  canvasTransform: ZoomTransform;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });
  console.log(card);

  return (
    <Dialog>
      <AssignedEmployeeFurniture furniture={{ ...card, office_id: 1 }} />
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            style={{
              position: "absolute",
              top: `${card.coordinates.y * canvasTransform.k}px`,
              left: `${card.coordinates.x * canvasTransform.k}px`,
              transformOrigin: "top left",
              ...(transform
                ? {
                    // temporary change to this position when dragging
                    transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${canvasTransform.k})`,
                  }
                : {
                    // zoom to canvas zoom
                    transform: `scale(${canvasTransform.k})`,
                  }),
            }}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onPointerDown={(e) => {
              listeners?.onPointerDown?.(e);
              e.preventDefault();
            }}
          >
            <div
              style={{
                width: `${card.size_x * 2}rem`,
                height: `${card.size_y * 2}rem`,
              }}
              className={` bg-white p-5 border rounded`}
            >
              {card.name}
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="z-[100]">
          <ContextMenuItem>
            <DialogTrigger asChild>
              <p>Назначить сотруднику</p>
            </DialogTrigger>
          </ContextMenuItem>
          <ContextMenuItem>
            <p>Инвентарь</p>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Dialog>
  );
};
