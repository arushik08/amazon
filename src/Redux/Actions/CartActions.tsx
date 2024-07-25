import { ADD_TO_CART, REMOVE_FROM_CART,UPDATE_CART_QUANTITY,SET_TOTAL_ITEMS , EMPTY_CART } from './ActionTypes';
import { Product } from '../Types';

export const addToCart = (product: Product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (productId: number) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const updateCartQuantity = (productId :number, quantity:number) => ({
  type: 'UPDATE_CART_QUANTITY',
  payload: { productId, quantity },
});

export const setTotalItems = (totalItems: number) => ({
  type: SET_TOTAL_ITEMS,
  payload: totalItems,
});



export const emptyCart = () => ({
  type: EMPTY_CART,
});
