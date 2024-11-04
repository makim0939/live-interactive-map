import MapContents from './components/MapContents';
import useSendViewRect from './hooks/useSendViewRect';
import useSocketIoConnection from './hooks/useSocketIoConnection';
function App() {
  const socket = useSocketIoConnection();
  useSendViewRect(socket);
  return (
    <>
      <MapContents />
    </>
  );
}

export default App;
