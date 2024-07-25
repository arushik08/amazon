// Define action types
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const SET_TOTAL_ITEMS = 'SET_TOTAL_ITEMS';
export const EMPTY_CART = 'EMPTY_CART';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity:number;
}

export interface User {
      address: {
        geolocation: {
          lat: number,
          long: number
        },
        city: string,
        street: string,
        number: number,
        zipcode: number
      },
      id: number,
      email: string,
      username: string,
      password: string,
      name: {
        firstname: string,
        lastname: string
      },
      phone: number,
      __v: number
}

export interface CartState {
  items: Product[];
  totalItems: number;
}

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: number;
}

interface UpdateCartQuantityAction {
  type: typeof UPDATE_CART_QUANTITY;
  payload: {
    productId: number;
    quantity: number;
  };
}

interface EmptyCartAction{
  type: typeof EMPTY_CART;
  payload: {
    productId: number;
    quantity: number;
  };
}

interface SetTotalItemsAction{
  type : typeof SET_TOTAL_ITEMS;
  payload: number;
}

export type CartAction = AddToCartAction | RemoveFromCartAction | UpdateCartQuantityAction | SetTotalItemsAction | EmptyCartAction;
