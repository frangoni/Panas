import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk("CREATE_PRODUCT", (data) => {
  return axios
    .post("/api/product", data)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log("ERROR AL CREAR PRODUCTO", e));
});

const initialState = {
  product: {},
  products: [],
  created: "",
};

const product = createReducer(initialState, {
  [createProduct.fulfilled]: (state, action) => {
    if (action.payload) {
      return { ...state, product: action.payload, created: "yes" };
    } else {
      return { ...state, created: "no" };
    }
  },
  [createProduct.pending]: (state) => {
    return { ...state, created: "" };
  },
});

export default product;
