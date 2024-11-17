import type Konva from "konva";
import { useEffect, useRef } from "react";
import type { UseFormReturn, UseFormSetValue } from "react-hook-form";
import { Rect, Transformer } from "react-konva";
import type { BoothInsertProps, Rect as RectProps } from "../../types";
import type { BoothFormState } from "./BoothSettings";

type BoothRectProps = {
  hookForm: UseFormReturn<BoothInsertProps, undefined>;
  rect: RectProps;
  selected?: boolean;
  rectLength: number;
  openForm: BoothFormState;
};
const BoothRect = (props: BoothRectProps) => {
  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const { left, top, width, height } = props.rect;
  const { watch, setValue, reset } = props.hookForm;

  useEffect(() => {
    if (!shapeRef.current) return;
    if (props.openForm === "none") {
      console.log("reset");
      const x = props.rect.left;
      const y = props.rect.top;
      const width = props.rect.width;
      const height = props.rect.height;
      shapeRef.current.setAttrs({ x, y, width, height });
      reset();
    }
    if (!trRef.current) return;
    if (!props.selected) return;
    trRef.current.nodes([shapeRef.current]);
    shapeRef.current.setZIndex(props.rectLength);
    trRef.current.setZIndex(props.rectLength);

    const watchInputs = watch((value, { name, type }) => {
      if (!trRef.current || !shapeRef.current) return;
      if (name === "left" || name === "top" || name === "width" || name === "height") {
        const { left, top, width, height } = value;
        const x = Number(left);
        const y = Number(top);
        const w = Number(width);
        const h = Number(height);
        shapeRef.current.setAttrs({ x, y, width: w, height: h });
        // shapeRef.current.getLayer()?.batchDraw();
      }
    });
    return () => watchInputs.unsubscribe();
  }, [props.selected, props.rectLength, props.rect, props.openForm, watch, reset]);

  const setValues = (x: number, y: number, w: number, h: number) => {
    setValue("left", Math.round(x));
    setValue("top", Math.round(y));
    setValue("width", Math.round(w));
    setValue("height", Math.round(h));
  };
  const handleDragEnd = () => {
    if (!shapeRef.current) return;
    const { x, y, width, height } = shapeRef.current.getAttrs();
    if (!x || !y || !width || !height) return;
    const { x: scaleX, y: scaleY } = shapeRef.current.getAbsoluteScale();
    const w = width * scaleX;
    const h = height * scaleY;
    setValues(x, y, w, h);
  };
  const handleTransformEnd = () => {
    if (!shapeRef.current) return;
    const { x, y, width, height } = shapeRef.current.getAttrs();
    if (!x || !y || !width || !height) return;
    const { x: scaleX, y: scaleY } = shapeRef.current.getAbsoluteScale();
    const w = width * scaleX;
    const h = height * scaleY;
    setValues(x, y, w, h);
  };

  return (
    <>
      <Rect
        ref={shapeRef}
        x={left}
        y={top}
        width={width}
        height={height}
        stroke={props.selected ? "#ff0000" : "#ff000020"}
        strokeWidth={5}
        draggable={props.selected}
        // onDragMove={setRectPosition}
        onDragEnd={handleDragEnd}
        strokeScaleEnabled={false}
      />
      {props.selected && (
        <Transformer
          ref={trRef}
          flipEnabled={true}
          keepRatio={false}
          rotateEnabled={false}
          //   onTransform={setRectSize}
          onTransformEnd={handleTransformEnd}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default BoothRect;
