import ChatScreen from './ChatScreen';
import MessageForm from './MessageForm';
import { io, Socket } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { ServerToClientEvents, ClientToServerEvents } from '../../../back/@types/socketTypes';

function App() {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const [usersConnected, setUsersConnected]: [usersConnected: any, setUsersConnected: any] = useState([]);
  useEffect(() => {
    socketRef.current = io('http://localhost:4000');
    socketRef.current.on('message', data => {
      console.log('message', data);
    });
    socketRef.current.on('usersLogin', data => {
      console.log('usersLogin', data);
      setUsersConnected(data);
    });
    // socketRef.current.on('message', data =)
  }, []);

  return (
    <div className="App">
      <h1>Chat App</h1>
      <ChatScreen usersConnected={usersConnected} />
      <MessageForm socketRef={socketRef} />
    </div>
  );
}

export default App;
