import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { ClientCanvas, Rect } from '../types';

//TODO:キャンバスの設定

// キャンバス管理全般
const useClientCanvases = (contentsRect: Rect, socket?: Socket) => {
  const [clientCanvases, setClientCanvases] = useState<ClientCanvas[]>([]);
  useEffect(() => {
    const createCanvas = (id: string) => {
      const canvas = document.createElement('canvas');
      canvas.id = id;
      canvas.style.position = 'absolute';
      canvas.style.left = contentsRect.left + 'px';
      canvas.style.top = contentsRect.top + 'px';
      canvas.width = contentsRect.width;
      canvas.height = contentsRect.height;
      document.getElementById('root')?.appendChild(canvas);
      return canvas;
    };
    if (!socket) return;
    socket.on('client-connect', (clientId: string) => {
      const canvas = createCanvas(clientId);
      setClientCanvases([...clientCanvases, { id: clientId, canvas }]);
    });
    socket.on('client-disconnect', (clientId: string) => {
      clientCanvases.find((ctx) => ctx.id === clientId)?.canvas.remove();
    });
    return () => {
      socket.off('client-connect');
    };
  }, [socket, clientCanvases, contentsRect]);

  useEffect(() => {
    clientCanvases.forEach((clientCanvas) => {
      const canvas = clientCanvas.canvas;
      canvas.style.left = contentsRect.left + 'px';
      canvas.style.top = contentsRect.top + 'px';
      canvas.width = contentsRect.width;
      canvas.height = contentsRect.height;
    });
  }, [contentsRect]);
  return clientCanvases;
};

export default useClientCanvases;
