// src/Redux/Actions/UserActions.ts
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../Store';
import { LOGIN_USER, UserActionTypes } from './ActionTypes';
import {User} from '../Types';

export const loginUser = (userData: User): UserActionTypes => ({
  type: LOGIN_USER,
  payload: userData,
});

export const authenticateUser = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, UserActionTypes> => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();

      const user = users.find((user: User) => user.email === email && user.password === password);

      if (user) {
        dispatch(loginUser(user));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
};
