import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../../constants/api";
import axios from "axios";

// DAL
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkApi) => {
    const { currentPage, category, sortBy, order, titleValue } = params;

    const res = await axios.get(
      `${BASEURL}/?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${titleValue}`
    );
    if (res.data.length === 0) {
      thunkApi.rejectWithValue("Пиццы пустые");
    }
    return thunkApi.fulfillWithValue(res.data);
  }
);

// BLL
const initialState = {
  items: [],
  item: {},
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setPizzaItem: (state, action) => {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state, action) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        console.log(state.status);
        state.items = [];
      });
  },
});

export const selectPizzaData = (state) => state.pizzasSlice;

export const { setItems, setPizzaItem } = pizzasSlice.actions;

export default pizzasSlice.reducer;
