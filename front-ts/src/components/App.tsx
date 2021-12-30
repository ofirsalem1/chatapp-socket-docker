import ChatScreen from './ChatScreen';
import MessageForm from './MessageForm';
import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useContext } from 'react';
import { ServerToClientEvents, ClientToServerEvents } from '../../../back/@types/socketTypes';
import { AppContext } from '../contexts/AppContext';

function App() {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    socketRef.current = io('http://localhost:4000', { auth: { user: 'user' } });
    socketRef.current.on('message', messageInfo => {
      dispatch({ type: 'GET_MESSAGE', payload: { message: `${messageInfo.name}: ${messageInfo.message}` } });
    });
    socketRef.current.on('usersLogin', data => {
      dispatch({ type: 'ONLINE_USERS', payload: { userInfo: data } });
    });
    socketRef.current.on('userConnected', message => {
      dispatch({ type: 'GET_MESSAGE', payload: { message } });
    });
    socketRef.current.on('userDisconnected', message => {
      dispatch({ type: 'GET_MESSAGE', payload: { message } });
    });
  }, []);

  return (
    <div className="App">
      <h1>Chat App</h1>
      <ChatScreen />
      <MessageForm socketRef={socketRef} />
    </div>
  );
}

export default App;
