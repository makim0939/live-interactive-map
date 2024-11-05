import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const socket = io(SERVER_URL);
    socket.on('connect', () => {
      socket.emit('display-detection', socket.id);
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
  return socket;
};

export default useSocket;
