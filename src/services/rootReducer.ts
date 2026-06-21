import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { feedReducer } from './slices/feedSlice';
import { userReducer } from './slices/userSlice';
import { constructorReducer } from './slices/constructorSlice';
import { orderReducer } from './slices/orderSlice';
import { profileOrdersReducer } from './slices/profileOrdersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  user: userReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  profileOrders: profileOrdersReducer
});
