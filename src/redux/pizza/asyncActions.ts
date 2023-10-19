import axios from "axios";
import { BASEURL } from "../../constants/api";
import { FetchPizzasParams, Pizza } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

// DAL
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