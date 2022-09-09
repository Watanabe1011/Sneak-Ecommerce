import { createSlice } from "@reduxjs/toolkit";

export const products = [
  {
    name: "Autumn Limited Edition",
    price: "125.00",
  },
];

const initialState = {
  cart: [],
  total: 0,
  amount: 0,
  item: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state) => {
      state.item = state.item + 1;
      state.amount = state.item * Number(products[0].price);
    },
    addItem: (state) => {
      state.item = state.item + 1;
      state.amount = state.item * Number(products[0].price);
    },
    decreaseItem: (state) => {
      state.item = state.item - 1;
      state.amount = state.item * Number(products[0].price);
    },
  },
});

export const { addToCart, addItem, decreaseItem } = cartSlice.actions;
export default cartSlice.reducer;
