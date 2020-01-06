import React, { useReducer, createContext, useContext } from 'react';

type Action = {
  type: string
}

export type SetUserAction = {
  type: 'SET_USER'
  payload: any | null
}

export const userInitialState = { user: null };

export function userReducer(state: {user: SetUserAction['payload']}, action: SetUserAction) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const StateContext = createContext(userInitialState as {user: SetUserAction['payload']});

const DispatchContext = createContext((() => {}) as React.Dispatch<SetUserAction>);

const Provider:React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useDispatch = () => {
  return useContext(DispatchContext);
};

export const useGlobalState = <K extends keyof {user: SetUserAction['payload']}>(property: K) => {
  const state = useContext(StateContext);
  return state[property];
};

export default Provider;
