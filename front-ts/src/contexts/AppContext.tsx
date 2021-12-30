import { createContext, useReducer, Dispatch } from 'react';
import { appReducer } from '../reducers/appReducer';

const initialState = {
  usersConnected: [],
  messages: [],
};

const AppContext = createContext<{ state: any; dispatch: Dispatch<any> }>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: any = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer<any>(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
