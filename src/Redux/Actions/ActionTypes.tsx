import { User } from "../Types";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const LOGIN_USER = "LOGIN_USER";
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const SET_TOTAL_ITEMS = 'SET_TOTAL_ITEMS';
export const EMPTY_CART = 'EMPTY_CART';


export interface LoginUserAction {
  type: typeof LOGIN_USER;
  payload: User;
}

export type UserActionTypes = LoginUserAction;
