import { useAtom } from "jotai";
import type { UseFormReturn } from "react-hook-form";
import { Layer, Stage } from "react-konva";
import { contentsRectAtom } from "../../atoms";
import type { Booth, BoothInsertProps } from "../../types";
import BoothRect from "./BoothRect";
import type { BoothFormState } from "./BoothSettings";

type BoothRectStageProps = {
  boothRects: Omit<Booth, "name" | "description">[];
  hookForm: UseFormReturn<BoothInsertProps, undefined>;
  openForm: BoothFormState;
  selectedBoothId: number;
};
const BoothRectStage = (props: BoothRectStageProps) => {
  const [contentsRect] = useAtom(contentsRectAtom);
  return (
    <div
      className=" absolute left-0 top-0 z-0"
      style={{
        transform: `translate(${contentsRect.left}px, ${contentsRect.top}px)`,
      }}
    >
      <Stage width={contentsRect.width} height={contentsRect.height}>
        <Layer>
          {props.boothRects.map((boothRect) => (
            <BoothRect
              key={boothRect.id}
              rect={boothRect}
              selected={boothRect.id === props.selectedBoothId}
              hookForm={props.hookForm}
              rectLength={props.boothRects.length}
              openForm={props.openForm}
            />
          ))}
          {props.openForm === "add" && (
            <BoothRect
              rect={{ left: 0, top: 0, width: 100, height: 100 }}
              selected={true}
              hookForm={props.hookForm}
              rectLength={props.boothRects.length}
              openForm={props.openForm}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default BoothRectStage;
