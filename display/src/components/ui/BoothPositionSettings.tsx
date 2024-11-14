import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Transformer } from 'react-konva';

const BoothPositionSettings = () => {
  const trRef = useRef<Konva.Transformer>(null);
  const shapeRef = useRef<Konva.Rect>(null);
  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {};
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {};
  useEffect(() => {
    if (!trRef.current || !shapeRef.current) return;
    trRef.current.nodes([shapeRef.current]);
  }, []);
  return (
    <div className=" absolute top-0 left-0 ">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer draggable>
          <Rect
            ref={shapeRef}
            x={20}
            y={50}
            width={100}
            height={100}
            stroke={'red'}
            strokeWidth={5}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            strokeScaleEnabled={false}
          />
          <Transformer
            ref={trRef}
            flipEnabled={true}
            keepRatio={false}
            ignoreStroke={false}
            rotateEnabled={false}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default BoothPositionSettings;
