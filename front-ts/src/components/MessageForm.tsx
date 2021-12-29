import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '../../../back/@types/socketTypes';

const MessageForm = () => {
  const [messageInfo, setMessageInfo] = useState({ name: '', message: '' });
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
  useEffect(() => {
    socketRef.current = io('http://localhost:4000');
    socketRef.current.on('message', data => {
      console.log(data);
    });
    socketRef.current.on('usersLogin', data => {
      console.log('usersLogin', data);
    });
    // socketRef.current.on('message', data =)
  }, []);

  const handleChange = (e: any) => {
    setMessageInfo({ ...messageInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (socketRef.current) {
      socketRef.current.emit('message', messageInfo);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input onChange={handleChange} value={messageInfo.name} type="text" name="name" />
      <label>Message</label>
      <input onChange={handleChange} value={messageInfo.message} type="text" name="message" />
      <button className="send-message-btn">Send</button>
    </form>
  );
};

export default MessageForm;
