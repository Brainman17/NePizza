import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";

const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzasSlice,
  },
});

export default store;
