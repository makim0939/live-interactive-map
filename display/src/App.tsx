import { io } from 'socket.io-client';
import MapContents from './components/MapContents';
import useContentsScaling from './hooks/useContentsScaling';
import useClientCanvases from './hooks/useClientCanvases';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
const socket = io(SERVER_URL);
socket.on('connect', () => {
  socket.emit('display-detection');
});

function App() {
  const { ratio, contentsRect } = useContentsScaling();
  const clientCanvases = useClientCanvases(contentsRect, socket);
  return (
    <>
      <div id="contents" className=" w-fit">
        <MapContents />
      </div>
    </>
  );
}

export default App;
