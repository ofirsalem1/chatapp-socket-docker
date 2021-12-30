// onlineUsers: [],
// messages: [],

export const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ONLINE_USERS':
      state.onlineUsers = action.payload.userInfo;
      return state;
    default:
      return state;
  }
};
