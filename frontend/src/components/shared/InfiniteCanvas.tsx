import { CELL_SIZE } from "@/lib/constants/size";

import { ReactInfiniteCanvasHandle } from "react-infinite-canvas";
import { Area } from "@/pages/MapPage/Area";
import { AddingFurnite } from "./MapSidebar";

export const InfiniteCanvas = ({
  firstCards,
  setFirstCards,
  mapItems,
  setMapItems,
}: {
  firstCards: { name: string; size_x: number; size_y: number; id: number }[];
  canvasRef: React.MutableRefObject<ReactInfiniteCanvasHandle | undefined>;
  setFirstCards: React.Dispatch<
    React.SetStateAction<
      { name: string; size_x: number; size_y: number; id: number }[]
    >
  >;
  mapItems: {
    office_id: number;
    name: string;
    id: number;
    items: AddingFurnite[];
  }[];
  setMapItems: React.Dispatch<
    React.SetStateAction<
      { office_id: number; name: string; id: number; items: AddingFurnite[] }[]
    >
  >;
}) => {
  return (
    <>
      <div
        style={{
          width: "80vw",
          height: "80vh",
          border: "1px solid #ccc",
          position: "relative",
        }}
      >
        <div>
          {Object.keys(mapItems).map((el) => (
            <Area
              id={Number(el)}
              firstCards={firstCards}
              setFirstCards={setFirstCards}
              mapCards={mapItems}
              setMapCards={setMapItems}
            />
          ))}
        </div>
        <button
          onClick={() => {
            setMapItems((prev) => [
              ...prev,
              {
                office_id: prev[0].office_id,
                name: "Этаж",
                id: Math.floor(Math.random() * 10_000_000),
                items: [],
              },
            ]);
          }}
          style={{ width: CELL_SIZE * 30, height: CELL_SIZE * 5 }}
          className="text-8xl border border-stone-300"
        >
          +
        </button>
        {/* </ReactInfiniteCanvas> */}
      </div>
    </>
  );
};
