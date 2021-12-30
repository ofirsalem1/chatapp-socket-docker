import ChatScreen from './ChatScreen';
import MessageForm from './MessageForm';
import { io, Socket } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { ServerToClientEvents, ClientToServerEvents } from '../../../back/@types/socketTypes';
import { AppProvider } from '../contexts/AppContext';

function App() {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const [usersConnected, setUsersConnected]: [usersConnected: any, setUsersConnected: any] = useState([]);
  const [messages, setMessages]: [usersConnected: any, setUsersConnected: any] = useState([]);
  useEffect(() => {
    socketRef.current = io('http://localhost:4000', { auth: { user: 'user' } });
    socketRef.current.on('message', messageInfo => {
      setMessages((prev: any) => [...prev, `${messageInfo.name}: ${messageInfo.message}`]);
    });
    socketRef.current.on('usersLogin', data => {
      setUsersConnected(data);
    });
    socketRef.current.on('userConnected', message => {
      setMessages((prev: any) => [...prev, message]);
    });
    socketRef.current.on('userDisconnected', message => {
      setMessages((prev: any) => [...prev, message]);
    });
  }, []);

  return (
    <AppProvider>
      <div className="App">
        <h1>Chat App</h1>
        <ChatScreen usersConnected={usersConnected} messages={messages} />
        <MessageForm socketRef={socketRef} />
      </div>
    </AppProvider>
  );
}

export default App;
