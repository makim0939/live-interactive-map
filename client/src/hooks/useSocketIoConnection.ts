import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://' + location.hostname + ':3000';
const useSocketIoConnection = () => {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const socket = io(SERVER_URL);
    socket.on('connect', () => {
      console.log('Connected to server', socket.id);
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
  return socket;
};

export default useSocketIoConnection;
