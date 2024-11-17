import type Konva from "konva";
import { useEffect, useRef } from "react";
import type { UseFormSetValue } from "react-hook-form";
import { Rect, Transformer } from "react-konva";
import type { BoothInsertProps, Rect as RectProps } from "../../types";

type BoothRectProps = {
	rect: RectProps;
	selected?: boolean;
	setValue: UseFormSetValue<BoothInsertProps>;
};
const BoothRect = (props: BoothRectProps) => {
	const shapeRef = useRef<Konva.Rect>(null);
	const trRef = useRef<Konva.Transformer>(null);
	const { left, top, width, height } = props.rect;

	useEffect(() => {
		if (!props.selected) return;
		if (!trRef.current || !shapeRef.current) return;
		trRef.current.nodes([shapeRef.current]);
	}, [props.selected]);

	const setValues = (x: number, y: number, w: number, h: number) => {
		props.setValue("left", Math.round(x));
		props.setValue("top", Math.round(y));
		props.setValue("width", Math.round(w));
		props.setValue("height", Math.round(h));
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
