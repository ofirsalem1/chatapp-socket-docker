// Importing module

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './@types/socketTypes';

const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer);
// const io = new Server(httpServer, {
//   /* options */
// });

io.on('connection', socket => {
  //   io.emit('userConnected', 'user connected');
  socket.on('message', message => {
    console.log(message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    io.emit('message', { name: 'ofir', message: 'here' });
  });
});

httpServer.listen(4000, () => {
  console.log('listening...');
});
