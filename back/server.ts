// Importing module

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './@types/socketTypes';
import { usersArr } from './db/usersDb';
const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer);

io.on('connection', socket => {
  //   io.emit('userConnected', 'user connected');
  usersArr.push(socket.id);
  io.emit('usersLogin', usersArr);
  io.emit('userConnected', `${socket.id} is connected`);

  socket.on('message', message => {
    if (message.room) {
      message.name = `privet ${message.name}`;
      socket.emit('message', message);
      io.to(message.room).emit('message', message);
    } else {
      io.emit('message', message);
    }
  });

  socket.on('disconnect', () => {
    const userIndex = usersArr.indexOf(socket.id); // delete the user that disconnected
    usersArr.splice(userIndex, 1);
    io.emit('usersLogin', usersArr);
    io.emit('userDisconnected', `${socket.id} is disconnected`);
  });
});

httpServer.listen(4000, () => {
  console.log('listening...');
});
