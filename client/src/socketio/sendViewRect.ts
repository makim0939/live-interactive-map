import type { Socket } from "socket.io-client";
import type { Rect } from "../types";

const sendViewRect = (socket: Socket, viewRect: Rect) => {
  const colorInput = document.getElementById("colorInput") as HTMLInputElement;
  socket.emit("view-rect", {
    ...viewRect,
    color: colorInput ? colorInput.value : "#00ff00a0",
  });
};
export default sendViewRect;
