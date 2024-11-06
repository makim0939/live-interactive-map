import { io } from 'socket.io-client';
import MapContents from './components/MapContents';
import useSendViewRect from './hooks/useSendViewRect';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
const socket = io(SERVER_URL);

function App() {
  useSendViewRect(socket);
  return (
    <>
      <MapContents />
    </>
  );
}

export default App;
