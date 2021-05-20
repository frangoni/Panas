import { createReducer, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('FETCH_PRODUCTS', () => {
  return axios
    .get('/api/product')
    .then(({ data }) => data)
    .catch((e) => console.log('ERROR AL TRAER PRODUCTOS', e));
});

export const createProduct = createAsyncThunk('CREATE_PRODUCT', (data) => {
  return axios
    .post('/api/product', data)
    .then(({ data }) => data)
    .catch((e) => console.log('ERROR AL CREAR PRODUCTO', e));
});

export const editProduct = createAsyncThunk('EDIT_PRODUCT', (data) => {
  return axios
    .put(`/api/product/${data.id}`, data)
    .then(({ data }) => data)
    .catch((e) => console.log('ERROR AL EDITAR PRODUCTO', e));
});

export const deleteProduct = createAsyncThunk('DELETE_PRODUCT', (id) => {
  return axios
    .delete(`/api/product/${id}`)
    .then(({ data }) => data)
    .catch((e) => console.log('ERROR AL BORRAR PRODUCTO', e));
});

export const cleanState = createAction('CLEAN_STATE', () => {
  return {};
});

const initialState = {
  product: {},
  products: [],
  created: '',
};

const product = createReducer(initialState, {
  [fetchProducts.fulfilled]: (state, action) => {
    return { ...state, products: action.payload };
  },
  [createProduct.fulfilled]: (state, action) => {
    if (action.payload) {
      return { ...state, product: action.payload, created: 'yes' };
    } else {
      return { ...state, created: 'no' };
    }
  },
  [createProduct.pending]: (state) => {
    return { ...state, created: '' };
  },
  [editProduct.fulfilled]: (state, action) => {
    console.log('action :', action.payload);
    return { ...state, products: replaceFromArr(state.products, action.payload) };
  },
  [deleteProduct.fulfilled]: (state, action) => {
    return { ...state, products: removeFromArr(state.products, action.payload) };
  },
  [cleanState]: (state) => {
    return { ...state, created: '' };
  },
});

const removeFromArr = (arr, obj) => {
  return arr.filter((product) => product._id !== obj._id);
};

const replaceFromArr = (arr, obj) => {
  return arr.map((product) => (product._id !== obj._id ? product : obj));
};

export default product;
