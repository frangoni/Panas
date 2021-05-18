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

export const fecthProducts = createAsyncThunk("FETCH_PRODUCTS", () => {
  return axios.get("/api/product").then(({ data }) => data);
});

export const editProduct = createAsyncThunk("FETCH_PRODUCTS", (id, data) => {
  return axios
    .patch(`/api/product/${id}`, data)
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
  [fecthProducts.fulfilled]: (state, action) => {
    return { ...state, products: action.payload };
  },
  [editProduct.fulfilled]: (state, action) => {
    return {
      ...state,
      products: { ...state.products.map((product) => (product._id == action.payload._id ? action.payload : product)) },
    };
  },
});

export default product;
