import MapContents from './components/MapContents';
import useContentsScaling from './hooks/useContentsScaling';
import useSocket from './hooks/useSocket';
function App() {
  const socket = useSocket();
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
