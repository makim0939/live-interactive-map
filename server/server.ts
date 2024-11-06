import http from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';
config({ path: '../.env.local' });

const server = http.createServer();
server.listen(3000, () => console.log('Server running on port 3000'));
const io = new Server(server, {
  cors: {
    origin: [process.env.VITE_CLIENT_URL as string, process.env.VITE_DISPLAY_URL as string],
  },
});

let displayId = '';
io.on('connection', (socket) => {
  socket.on('display-detection', () => {
    displayId = socket.id;
  });
  socket.to(displayId).emit('client-connect', socket.id);
  socket.on('disconnect', () => {
    socket.to(displayId).emit('client-disconnect', socket.id);
  });
});
