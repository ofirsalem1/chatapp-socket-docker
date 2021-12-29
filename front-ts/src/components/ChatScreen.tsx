import React from 'react';

const ChatScreen = ({ usersConnected }: { usersConnected: any }) => {
  return (
    <div className="chat-screen-div">
      <div className="users-list">
        <h3>Users connected</h3>
        <ul>
          {usersConnected.map((user: any, i: any) => {
            return <li key={i}>{user}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatScreen;
