import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pizza, StatusEnum, pizzasSliceState } from "./types";
import { fetchPizzas } from "./asyncActions";


const initialState: pizzasSliceState = {
  items: [],
  item: {
    id: '',
    title: '',
    imageUrl: '',
    price: 0,
    rating: 0,
    types: [0, 1],
    sizes: [25, 30, 40]
  },
  status: StatusEnum.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
    setPizzaItem: (state, action: PayloadAction<Pizza>) => {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = StatusEnum.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
        state.items = action.payload;
        state.status = StatusEnum.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = StatusEnum.ERROR;
        state.items = [];
      });
  },
});

export const { setItems, setPizzaItem } = pizzasSlice.actions;

export default pizzasSlice.reducer;
