// Importing module

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './@types/socketTypes';
import { usersArr } from './db/usersDb';
const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer);
// const io = new Server(httpServer, {
//   /* options */
// });

io.on('connection', socket => {
  //   io.emit('userConnected', 'user connected');
  usersArr.push(socket.id);
  io.emit('usersLogin', usersArr);

  socket.on('message', message => {
    console.log(message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    const userIndex = usersArr.indexOf(socket.id); // delete the user that disconnected
    usersArr.splice(userIndex, 1);
    io.emit('usersLogin', usersArr);
  });
});

httpServer.listen(4000, () => {
  console.log('listening...');
});
