import { Socket } from 'socket.io-client';

const sendViewRect = (socket: Socket) => {
  const colorInput = document.getElementById('colorInput') as HTMLInputElement;
  socket.emit('view-rect', {
    left: scrollX,
    top: scrollY,
    width: innerWidth,
    height: innerHeight,
    color: colorInput ? colorInput.value : '#00FF00',
  });
};
export default sendViewRect;
