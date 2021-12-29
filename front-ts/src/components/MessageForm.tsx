import { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../../../back/@types/socketTypes';

const MessageForm = ({ socketRef }: { socketRef: React.MutableRefObject<Socket<ServerToClientEvents, ClientToServerEvents> | undefined> }) => {
  const [messageInfo, setMessageInfo] = useState({ name: '', message: '' });

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
