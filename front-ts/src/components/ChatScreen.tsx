import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const ChatScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const handleClick = (e: any) => {
    // dispatch({ type: 'CHOOSE_ROOM', room: e.target.innerText });
  };
  console.log(state.messages);

  return (
    <div className="chat-screen-div">
      <div className="users-list">
        <h3>Users connected</h3>
        <ul>
          {state.onlineUsers.map((user: any, i: any) => {
            return (
              <li key={i} onClick={handleClick}>
                {user}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="messages-div">
        <ul>
          {state.messages.map((message: any, i: any) => {
            return <li key={i}>{message}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatScreen;
