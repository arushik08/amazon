import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, SET_TOTAL_ITEMS, EMPTY_CART } from '../Actions/ActionTypes';
import { CartAction, CartState } from '../Types';

const initialState: CartState = {
  items: [],
  totalItems: 0,
};

const cartReducer = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
        totalItems: state.totalItems + 1,
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case REMOVE_FROM_CART:
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.length,
      };

    case SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };

    case EMPTY_CART:
      return {
        ...state,
        items: [],
        totalItems: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
