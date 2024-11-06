import { io } from 'socket.io-client';
import MapContents from './components/MapContents';
import sendViewRect from './socketio/sendViewRect';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
const socket = io(SERVER_URL);

addEventListener('scroll', () => sendViewRect(socket));
function App() {
  return (
    <>
      <MapContents />
    </>
  );
}

export default App;
