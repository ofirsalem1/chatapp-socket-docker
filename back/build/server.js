"use strict";
// Importing module
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { createServer } from 'http';
const socket_io_1 = require("socket.io");
const usersDb_1 = require("./db/usersDb");
const app = (0, express_1.default)();
// const httpServer = createServer(app);
const server = app.listen(4000, () => {
    console.log('listening...');
});
const io = new socket_io_1.Server(server);
io.on('connection', socket => {
    //   io.emit('userConnected', 'user connected');
    const userName = socket.handshake.auth.user;
    // console.log(userName);
    usersDb_1.usersArr.push(socket.id);
    io.emit('usersLogin', usersDb_1.usersArr);
    io.emit('userConnected', `${socket.id} is connected`);
    socket.on('message', message => {
        if (message.room) {
            message.name = `privet ${message.name}`;
            socket.emit('message', message);
            io.to(message.room).emit('message', message);
        }
        else {
            io.emit('message', message);
        }
    });
    socket.on('disconnect', () => {
        const userIndex = usersDb_1.usersArr.indexOf(socket.id); // delete the user that disconnected
        usersDb_1.usersArr.splice(userIndex, 1);
        io.emit('usersLogin', usersDb_1.usersArr);
        io.emit('userDisconnected', `${socket.id} is disconnected`);
    });
});
