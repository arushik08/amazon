// src/Redux/Reducers/UserReducer.ts
import { LOGIN_USER, UserActionTypes } from '../Actions/ActionTypes';
import { User } from '../Types';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
