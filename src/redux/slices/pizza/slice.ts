import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASEURL } from "../../../constants/api";
import axios from "axios";
import { Pizza, StatusEnum, pizzasSliceState } from "./types";


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

// DAL

 export type FetchPizzasParams = {
  currentPage: string; 
  category: string; 
  sortBy: string; 
  order: string; 
  titleValue: string; 
 }

 // type FetchPizzasParams = Record<string, string>;
 // Record используем, если все ключи и/или значения одинакового типа

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: FetchPizzasParams) => {
    const { currentPage, category, sortBy, order, titleValue } = params;
    const { data } = await axios.get<Pizza[]>( 
      `${BASEURL}/?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${titleValue}`
    );
    return data as Pizza[];
  }
);


export const { setItems, setPizzaItem } = pizzasSlice.actions;

export default pizzasSlice.reducer;
