import { useEffect } from 'react';
import io from 'socket.io-client';
import MapContents from './components/MapContents';
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
      <MapContents />
    </>
  );
}

export default App;
