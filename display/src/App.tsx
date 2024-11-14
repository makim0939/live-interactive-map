import { io } from 'socket.io-client';
import MapContents from './components/MapContents';
import useContentsScaling from './hooks/useContentsScaling';
import useClientCanvases from './hooks/useClientCanvases';
import useDrawingViewRects from './hooks/useDrawViewRects';
import BoothSettingForm from './components/BoothSettingForm';
import Draggable from './components/ui/Draggable';
import BoothPositionSettings from './components/ui/BoothPositionSettings';
import BoothList from './components/BoothList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
console.log(SERVER_URL);
const socket = io(SERVER_URL, {
  extraHeaders: {
    'ngrok-skip-browser-warning': 'true',
  },
});
socket.on('connect', () => {
  console.log('server-connected');
  socket.emit('display-detection');
});

const queryClient = new QueryClient();

function App() {
  const { ratio, contentsRect } = useContentsScaling();
  const clientCanvases = useClientCanvases(contentsRect, socket);
  useDrawingViewRects(ratio, clientCanvases, socket);

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div id="contents" className=" w-fit">
        <MapContents />
      </div>
      <BoothPositionSettings />
      <Draggable ignoreTags={['input']}>
        <div className=" w-fit h-fit flex bg-bgwhite rounded-md">
          <BoothList isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
          {isFormOpen && (
            <>
              <div className=" w-[1px] my-4 bg-[#b5b5b8]"></div>
              <BoothSettingForm />
            </>
          )}
        </div>
      </Draggable>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
