import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

const useSendViewRect = (socket?: Socket) => {
  useEffect(() => {
    if (!socket) return;
    const sendViewRect = () => {
      const colorInput = document.getElementById('colorInput') as HTMLInputElement;
      socket.emit('view-rect', {
        left: scrollX,
        top: scrollY,
        width: innerWidth,
        height: innerHeight,
        color: colorInput ? colorInput.value : '#00FF00',
      });
    };
    addEventListener('scroll', sendViewRect);
    return () => {
      removeEventListener('scroll', sendViewRect);
      socket.off('view-rect');
    };
  }, [socket]);
};

export default useSendViewRect;
