import React, { useCallback, useEffect, useState } from 'react';

const Draggable = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent) => {
    if (isDragging) return;
    setIsDragging(true);
    setStartPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      if (!isDragging) return;
      const DeltaX = event.clientX - startPosition.x;
      const DeltaY = event.clientY - startPosition.y;
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
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div className=" w-[100vw] h-[100vh] ">
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        className=" absolute top-0 left-0 w-fit z-10 cursor-pointer origin-top-left"
      >
        {children}
      </div>
    </div>
  );
};

export default Draggable;
