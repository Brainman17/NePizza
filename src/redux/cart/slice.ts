import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/localStorage";
import { CartItem, CartSliceState } from "./types";

// state обычно типизируют интерфейсом
const initialState: CartSliceState = {
  totalPrice: getLocalStorage('totalPrice'),
  items: getLocalStorage('items'),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload.id;
      });

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => {
        return obj.id === action.payload;
      });
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
