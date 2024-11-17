import type React from "react";
import { useCallback, useEffect, useState } from "react";

const Draggable = ({
  children,
  ignoreTags,
}: {
  children: React.ReactNode;
  ignoreTags?: (keyof HTMLElementTagNameMap)[];
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (ignoreTags) {
      const upperIgnoreTags = ignoreTags?.map((tag) => tag.toUpperCase());
      const target = e.target as HTMLElement;
      if (upperIgnoreTags.includes(target.tagName)) {
        return;
      }
    }
    if (isDragging) return;
    setIsDragging(true);
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!isDragging) return;
      const DeltaX = e.clientX - startPosition.x;
      const DeltaY = e.clientY - startPosition.y;
      setPosition({
        x: endPosition.x + DeltaX,
        y: endPosition.y + DeltaY,
      });
    },
    [isDragging, startPosition, endPosition],
  );
  const handleMouseUp = () => {
    setIsDragging(false);
    setEndPosition({ x: position.x, y: position.y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      className=" absolute top-0 left-0 w-fit z-10 cursor-pointer origin-top-left"
    >
      {children}
    </div>
  );
};

export default Draggable;
