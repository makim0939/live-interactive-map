import { useEffect } from 'react';
import io from 'socket.io-client';
function App() {
  useEffect(() => {
    const SERVER_URL = 'http://' + location.hostname + ':3000';
    const socket = io(SERVER_URL);
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <h2 className=" text-red-600">Live Interactive Map - Client</h2>
    </>
  );
}

export default App;
