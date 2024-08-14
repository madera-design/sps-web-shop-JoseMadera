
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productsReducer from './productsSlice';
import addShoppingCar from './addShoppingCar';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart:addShoppingCar
  },
});