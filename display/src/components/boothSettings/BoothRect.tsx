import type Konva from "konva";
import { useCallback, useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { Booth, BoothInsertProps } from "../../types";
import type { BoothFormState } from "./BoothSettings";
import "./functions/boothRect";
import {
  createGroup,
  createRect,
  createTagLabel,
  createText,
  createTransformer,
  handleDragEnd,
  handleTransformEnd,
} from "./functions/boothRect";

type BoothRectProps = {
  hookForm: UseFormReturn<BoothInsertProps, undefined>;
  layer: Konva.Layer;
  rect: Omit<Booth, "description">;
  selected?: boolean;
  rectLength: number;
  openForm: BoothFormState;
};

const BoothRect = (props: BoothRectProps) => {
  const { setValue, reset, watch } = props.hookForm;

  const setValues = useCallback(
    (x: number, y: number, w: number, h: number) => {
      setValue("left", Math.round(x));
      setValue("top", Math.round(y));
      setValue("width", Math.round(w));
      setValue("height", Math.round(h));
    },
    [setValue],
  );

  useEffect(() => {
    const { left, top, width, height } = props.rect;
    const group = createGroup(left, top, props.selected);
    const rect = createRect(width, height, props.selected);
    const label = createTagLabel(props.rect.name);
    const text = createText(props.rect.name);
    const transformer = props.selected ? createTransformer(rect) : undefined;

    group.on("dragend", (e) => handleDragEnd(e, setValues));
    transformer?.on("transformend", (e) => handleTransformEnd(e, setValues));
    group.add(rect);
    label.add(text);
    group.add(label);
    transformer && group.add(transformer);
    props.layer.add(group);
    const watchInputs = props.selected
      ? watch((data, { name }) => {
          if (name === "name" && data.name) {
            text.text(data.name);
            label.opacity(1);
          }
        })
      : undefined;
    return () => {
      group.destroy();
      watchInputs?.unsubscribe();
    };
  }, [props.layer, props.rect, props.selected, setValues, watch]);
  return <></>;
};

export default BoothRect;
