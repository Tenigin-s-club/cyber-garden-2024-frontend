import { useDraggable } from "@dnd-kit/core";
import { AddingFurnite } from "./MapSidebar";
import { CELL_SIZE } from "@/lib/constants/size";
import { cn } from "@/lib/utils";
import { itemColor } from "./SidebarItem";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { AssignedEmployeeFurniture } from "./AssignedEmployeeFurniture";

export const Draggable = ({ card }: { card: AddingFurnite }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.id,
  });

  return (
    <>
      <Dialog>
        <AssignedEmployeeFurniture inventory={{ fio: "", id: 0, name: "" }} />

        <ContextMenu>
          <ContextMenuTrigger>
            <div
              key={`${card.id}`}
              style={{
                zIndex: 50,
                width: CELL_SIZE * card.size_x,
                height: CELL_SIZE * card.size_y,
                top: card.y,
                left: card.x,
              }}
              id={`${card.id}`}
              className={cn(
                itemColor[
                  Number(card.id.toString().split("_")[0]) % itemColor.length
                ],
                "box-border absolute rounded cursor-grab"
              )}
              ref={setNodeRef}
              {...listeners}
              {...attributes}
            />
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
    </>
  );
};
