import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();

server.listen(3000, () => console.log('Server running on port 3000'));
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
