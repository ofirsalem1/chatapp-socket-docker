export const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHOOSE_ROOM':
      state.messages = [...state.messages, action.room];
      return { ...state };
    default:
      return state;
  }
};
