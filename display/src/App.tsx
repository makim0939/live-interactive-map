import { io } from 'socket.io-client';
import MapContents from './components/MapContents';
import useContentsScaling from './hooks/useContentsScaling';
import useClientCanvases from './hooks/useClientCanvases';
import useDrawingViewRects from './hooks/useDrawViewRects';
import BoothSettingForm from './components/BoothSettingForm';
import Draggable from './components/ui/Draggable';
import BoothPositionSettings from './components/ui/BoothPositionSettings';
import BoothList from './components/BoothList';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
const socket = io(SERVER_URL);
socket.on('connect', () => {
  socket.emit('display-detection');
});

function App() {
  const { ratio, contentsRect } = useContentsScaling();
  const clientCanvases = useClientCanvases(contentsRect, socket);
  useDrawingViewRects(ratio, clientCanvases, socket);
  return (
    <>
      <div id="contents" className=" w-fit">
        <MapContents />
      </div>
      <BoothPositionSettings />
      <Draggable ignoreTags={['input']}>
        <div className=" w-fit h-fit flex bg-bgwhite rounded-md">
          <BoothList />
          <div className=" w-[1px] my-4 bg-[#b5b5b8]"></div>
          <BoothSettingForm />
        </div>
      </Draggable>
    </>
  );
}

export default App;
