import { io } from 'socket.io-client';
import MapContents from './components/MapContents';
import useContentsScaling from './hooks/useContentsScaling';
import useClientCanvases from './hooks/useClientCanvases';
import useDrawingViewRects from './hooks/useDrawViewRects';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import BoothSettings from './components/boothSettings/BoothSettings';

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

  return (
    <QueryClientProvider client={queryClient}>
      <div id="contents" className=" w-fit">
        <MapContents />
      </div>
      <BoothSettings />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
