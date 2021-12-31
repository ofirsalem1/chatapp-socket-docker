import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const ChatScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const handleClick = (e: any) => {
    // dispatch({ type: 'CHOOSE_ROOM', room: e.target.innerText });
  };

  return (
    <div className="chat-screen-div">
      <div className="users-list-div">
        <h3>Users connected</h3>
        <ul className="list">
          {state.onlineUsers.map((user: string, i: number) => {
            return (
              <li key={i} onClick={handleClick}>
                {user}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="messages-div">
        <ul className="list">
          {state.messages.map((message: string, i: number) => {
            return <li key={i}>{message}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatScreen;
