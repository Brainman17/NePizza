import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/localStorage";
import { Sort, filterSliceState } from "./types";

const initialState: filterSliceState = {
  searchValue: getLocalStorage('searchValue'),
  categoryId: getLocalStorage('categoryId'),
  currentPage: getLocalStorage('currentPage'),
  sortType: getLocalStorage('sortType'),
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action:PayloadAction<Sort>) => {
      state.sortType = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<filterSliceState>) => {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortType;
    },
  },
});


export const {
  setSearchValue,
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
