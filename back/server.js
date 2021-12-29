"use strict";
// Importing module
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();
const io = new socket_io_1.Server(httpServer, {
/* options */
});
io.on('connection', socket => {
    io.emit('userConnected', 'user connected');
    socket.on('message', message => {
        console.log(message);
        io.emit('messageBack', message);
    });
    socket.on('disconnect', () => {
        io.emit('messageBack', { name: 'ofir', message: 'here' });
    });
});
httpServer.listen(4000);
