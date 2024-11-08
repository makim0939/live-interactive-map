import { io } from 'socket.io-client';
import MapContents from './components/MapContents';
import sendViewRect from './socketio/sendViewRect';
import { BoothInfo } from './types.ts';
import getBoothInViewport from './getBoothInViewPort.ts';
import { addDummyBooths } from './debugFunctinos.ts';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
const socket = io(SERVER_URL);

const booths: BoothInfo[] = [];
// テスト用にダミーブースを追加
addDummyBooths(booths);
//

socket.on('booth', (booth) => {
  booths.push(booth);
});

const handleScroll = () => {
  const viewRect = { left: scrollX, top: scrollY, width: innerWidth, height: innerHeight };
  sendViewRect(socket, viewRect);
  const boothInViewport = getBoothInViewport(booths, viewRect);
  if (!boothInViewport) return;
  //TODO:ブースカードの表示
};
addEventListener('scroll', handleScroll);
function App() {
  return (
    <>
      <MapContents />
    </>
  );
}

export default App;
