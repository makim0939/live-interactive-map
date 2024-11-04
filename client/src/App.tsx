import MapContents from './components/MapContents';
import useSocketIoConnection from './hooks/useSocketIoConnection';
function App() {
  const socket = useSocketIoConnection();
  return (
    <>
      <MapContents />
    </>
  );
}

export default App;
