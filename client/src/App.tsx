import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BoothInfo } from './types.ts';
import sendViewRect from './socketio/sendViewRect';
import getBoothInViewport from './getBoothInViewport.ts';
import { addDummyBooths } from './debugFunctinos.ts';
import MapContents from './components/MapContents';
import BoothCard from './components/BoothCard.tsx';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
const socket = io(SERVER_URL);

const booths: BoothInfo[] = [];
socket.on('booth', (booth: BoothInfo) => {
  booths.push(booth);
});

function App() {
  const [boothInViewport, setBoothInViewport] = useState<BoothInfo | undefined>(undefined);
  useEffect(() => {
    //DELETE:テスト用にダミーブースを追加
    addDummyBooths(booths);
    //

    const handleScroll = () => {
      const viewRect = { left: scrollX, top: scrollY, width: innerWidth, height: innerHeight };
      sendViewRect(socket, viewRect);
      const booth = getBoothInViewport(booths, viewRect);
      setBoothInViewport(booth);
    };
    addEventListener('scroll', handleScroll);
    return () => {
      //DELETE:テスト用にダミーブースを削除
      booths.splice(0);
      //
      removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <MapContents />
      {boothInViewport && (
        <BoothCard title={boothInViewport.title} description={boothInViewport.description} />
      )}
    </>
  );
}

export default App;
