import { createStore, combineReducers } from 'redux';
import cartReducer from './Redux/Reducers/cartReducer';
import userReducer from './Redux/Reducers/userReducer';
import userSLice from './Redux/userSLice';

const rootReducer = combineReducers({
  cart: cartReducer,
  user : userReducer,
  usEr:userSLice
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
