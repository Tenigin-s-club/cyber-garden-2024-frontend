import { useDroppable } from "@dnd-kit/core";
import { FC, PropsWithChildren } from "react";

export const Droppable: FC<PropsWithChildren & { id: string | number }> = (
  props
) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};
