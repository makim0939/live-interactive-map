import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import BoothCard from "./components/BoothCard.tsx";
import MapContents from "./components/MapContents";
import getBoothInViewport from "./getBoothInViewport.ts";
import sendViewRect from "./socketio/sendViewRect";
import type { Booth } from "./types.ts";
import { selectAllBooths } from "./utils/supabaseFunctions.ts";

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
const socket = io(SERVER_URL, {
  extraHeaders: {
    "ngrok-skip-browser-warning": "true",
  },
});

function App() {
  const [boothInViewport, setBoothInViewport] = useState<Booth | undefined>(undefined);
  const boothQuery = useQuery({ queryKey: ["booths"], queryFn: () => selectAllBooths() });
  const booths = boothQuery.data || [];

  useEffect(() => {
    const handleScroll = () => {
      const viewRect = {
        left: scrollX,
        top: scrollY,
        width: innerWidth,
        height: innerHeight,
      };
      sendViewRect(socket, viewRect);
      const booth = getBoothInViewport(booths, viewRect);
      setBoothInViewport(booth);
    };
    addEventListener("scroll", handleScroll);
    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, [booths]);
  return (
    <>
      <MapContents />
      {boothInViewport && <BoothCard boothId={boothInViewport.id} {...boothInViewport} />}
    </>
  );
}

export default App;
