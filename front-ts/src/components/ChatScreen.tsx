import React from 'react';

const ChatScreen = ({ usersConnected, messages }: { usersConnected: any; messages: any }) => {
  const handleClick = (e: any) => {
    console.log(e.target.innerText);
  };

  return (
    <div className="chat-screen-div">
      <div className="users-list">
        <h3>Users connected</h3>
        <ul>
          {usersConnected.map((user: any, i: any) => {
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
          {messages.map((message: any, i: any) => {
            return <li key={i}>{message}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatScreen;
