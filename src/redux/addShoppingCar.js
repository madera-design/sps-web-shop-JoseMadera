import { createSlice } from '@reduxjs/toolkit';

const addShoppingCar = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { id, title, price, images } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalItems += 1;
      } else {
        state.items.push({ id, title, price, images, quantity: 1 });
        state.totalItems += 1;
      }
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalItems -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== itemId);
          state.totalItems -= 1;
        }
      }
    }
  }
});

export const { addItemToCart, removeItemFromCart } = addShoppingCar.actions;
export default addShoppingCar.reducer;
