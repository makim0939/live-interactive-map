import { useAtom } from "jotai";
import Konva from "konva";
import React, { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import { contentsRectAtom } from "../../atoms";
import type { Booth, BoothInsertProps } from "../../types";
import BoothRect from "./BoothRect";
import type { BoothFormState } from "./BoothSettings";

type BoothRectStageProps = {
  boothRects: Omit<Booth, "description">[];
  hookForm: UseFormReturn<BoothInsertProps, undefined>;
  openForm: BoothFormState;
  selectedBoothId: number;
};
const layer = new Konva.Layer();
const BoothRectStage = (props: BoothRectStageProps) => {
  const [contentsRect] = useAtom(contentsRectAtom);
  const konvaContainerRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!konvaContainerRef.current) return;
    const stage = new Konva.Stage({
      container: konvaContainerRef.current,
      width: innerWidth,
      height: innerHeight,
    });
    stage.add(layer);
    stage.draw();
    return () => {
      layer.destroy();
      stage.destroy();
    };
  }, []);

  return (
    <div
      ref={konvaContainerRef}
      className=" absolute left-0 top-0 z-0"
      style={{
        transform: `translate(${contentsRect.left}px, ${contentsRect.top}px)`,
      }}
    >
      {props.boothRects.map((boothRect) => (
        <BoothRect
          key={boothRect.id}
          hookForm={props.hookForm}
          rect={boothRect}
          layer={layer}
          rectLength={props.boothRects.length}
          openForm={props.openForm}
          selected={boothRect.id === props.selectedBoothId}
        />
      ))}
      {props.openForm === "add" && (
        <BoothRect
          rect={{ id: -1, name: "", left: 0, top: 0, width: 100, height: 100 }}
          selected={true}
          hookForm={props.hookForm}
          rectLength={props.boothRects.length}
          openForm={props.openForm}
          layer={layer}
        />
      )}
    </div>
  );
};

export default BoothRectStage;
