import React, { useState } from 'react';

const Draggable = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: event.clientX - startPosition.x,
      y: event.clientY - startPosition.y,
    });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ left: position.x, top: position.y }}
        className=" absolute w-fit z-10 cursor-pointer"
      >
        {children}
      </div>
      <div
        onMouseMove={handleMouseMove}
        className=" fixed left-0 top-0 z-0 w-[100vw] h-[100vh]"
      ></div>
    </>
  );
};

export default Draggable;
