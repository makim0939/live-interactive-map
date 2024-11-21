import Konva from "konva";
import {} from "react";

const getNewRect = (group: Konva.Container, rect: Konva.Node) => {
  const { x, y } = group.getAttrs();
  const { width: rectW, height: rectH } = rect.getAttrs();
  const { x: scaleX, y: scaleY } = rect.getAbsoluteScale();
  if (x === undefined || y === undefined) return;
  if (rectW === undefined || rectH === undefined) return;
  const w = rectW * scaleX;
  const h = rectH * scaleY;
  return { x, y, w, h };
};

const handleDragEnd = (
  e: Konva.KonvaEventObject<Event>,
  setValues: (x: number, y: number, w: number, h: number) => void,
) => {
  const targetGroup = e.target as Konva.Group;
  const shapeChildren = targetGroup.getChildren((node) => node.getType() === "Shape");
  const targetRect = shapeChildren[0] as Konva.Rect;
  if (!targetGroup || !targetRect) return;

  const newRect = getNewRect(targetGroup, targetRect);
  if (!newRect) return;
  const { x, y, w, h } = newRect;
  setValues(x, y, w, h);
};
const handleTransformEnd = (
  e: Konva.KonvaEventObject<Event>,
  setValues: (x: number, y: number, w: number, h: number) => void,
) => {
  const target = e.currentTarget as Konva.Transformer;
  const targetRect = target.nodes()[0];
  const targetGroup = target.getParent() as Konva.Group;
  if (!targetGroup) return;

  const newRect = getNewRect(targetGroup, targetRect);
  const { x: rectX, y: rectY } = targetRect.getAttrs();
  if (!newRect) return;
  if (rectX === undefined || rectY === undefined) return;
  const { x: groupX, y: groupY, w, h } = newRect;
  const x = rectX + groupX;
  const y = rectY + groupY;
  setValues(x, y, w, h);

  targetGroup.setAttrs({ x: Math.round(x), y: Math.round(y) });
  targetRect.setPosition({ x: 0, y: 0 });
  targetRect.setSize({ width: Math.round(w), height: Math.round(h) });
  targetRect.setAttrs({ scaleX: 1, scaleY: 1 });
};

const createGroup = (x: number, y: number, selected?: boolean) => {
  return new Konva.Group({ x, y, draggable: selected });
};
const createRect = (width: number, height: number, selected?: boolean) => {
  return new Konva.Rect({
    width,
    height,
    stroke: selected ? "#ff0000" : "#ff000020",
    strokeWidth: 5,
    strokeScaleEnabled: false,
  });
};
const createTransformer = (target: Konva.Shape | Konva.Group) => {
  return new Konva.Transformer({
    nodes: [target],
    flipEnabled: false,
    keepRatio: false,
    rotateEnabled: false,
    boundBoxFunc: (oldBox, newBox) => {
      if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) return oldBox;
      return newBox;
    },
  });
};
const createTagLabel = (name: string) => {
  const label = new Konva.Label({ offset: { x: 2, y: 2 }, opacity: name ? 1 : 0 });
  const tag = new Konva.Tag({ fill: "black", opacity: 0.6 });
  label.add(tag);
  return label;
};
const createText = (name: string) => {
  return new Konva.Text({
    text: name,
    letterSpacing: 0.06,
    fontSize: 17,
    padding: 10,
    fill: "white",
  });
};

export {
  handleDragEnd,
  handleTransformEnd,
  createGroup,
  createRect,
  createTransformer,
  createTagLabel,
  createText,
};
