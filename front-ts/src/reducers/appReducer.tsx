// onlineUsers: [],
// messages: [],

export const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ONLINE_USERS':
      state.onlineUsers = action.payload.userInfo;
      return { ...state };
    case 'GET_MESSAGE':
      state.messages = [...state.messages, action.payload.message];
      return { ...state };
    default:
      return state;
  }
};
