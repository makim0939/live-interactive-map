import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
const useSocketIoConnection = () => {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const socket = io(SERVER_URL);
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
  return socket;
};

export default useSocketIoConnection;
