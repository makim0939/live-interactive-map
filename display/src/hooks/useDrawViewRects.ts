import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { ClientCanvas } from '../types';

type ViewRect = { left: number; top: number; width: number; height: number; color: string };
const useDrawingViewRects = (ratio: number, clientCanvases: ClientCanvas[], socket?: Socket) => {
  useEffect(() => {
    if (!socket) return;
    socket.on('view-rect', ({ clientId, viewRect }: { clientId: string; viewRect: ViewRect }) => {
      const canvas = clientCanvases.find((ctx) => ctx.id === clientId)?.canvas;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = viewRect.color;
      ctx.lineWidth = 5;
      ctx.strokeRect(
        viewRect.left * ratio,
        viewRect.top * ratio,
        viewRect.width * ratio,
        viewRect.height * ratio,
      );
    });
    return () => {
      socket.off('view-rect');
    };
  }, [socket, ratio, clientCanvases]);
};

export default useDrawingViewRects;
