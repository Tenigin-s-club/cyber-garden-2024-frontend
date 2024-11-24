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
  firstCards: AddingFurnite[];
  canvasRef: React.MutableRefObject<ReactInfiniteCanvasHandle | undefined>;
  setFirstCards: React.Dispatch<React.SetStateAction<AddingFurnite[]>>;
  mapItems: AddingFurnite[][];
  setMapItems: React.Dispatch<React.SetStateAction<AddingFurnite[][]>>;
}) => {
  // const canvasRef = useRef<ReactInfiniteCanvasHandle>();

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
        {/* <ReactInfiniteCanvas
          ref={canvasRef}
          onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
            mountFunc.fitContentToView({
              scale: 1,
              offset: {
                x: 0,
                y:
                  ((Object.keys(mapItems).length * 30 +
                    (Object.keys(mapItems).length - 1) * 5) *
                    -CELL_SIZE) /
                  3,
              },
            });
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
        > */}
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
            mapItems[mapItems.length] = [];
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
