import { io } from 'socket.io-client';
import MapContents from './components/MapContents';
import useContentsScaling from './hooks/useContentsScaling';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
const socket = io(SERVER_URL);

function App() {
  const { ratio, contentsRect } = useContentsScaling();
  return (
    <>
      <div id="contents" className=" w-fit">
        <MapContents />
      </div>
    </>
  );
}

export default App;
