import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createService = createAsyncThunk('CREATE_SERVICE', (data) => {
  return axios
    .post('/api/service', data)
    .then(({ data }) => data)
    .catch((e) => console.log(e));
});

export const fetchServices = createAsyncThunk('FETCH_SERVICES', () => {
  return axios
    .get('/api/service')
    .then(({ data }) => data)
    .catch((e) => console.log(e));
});

export const updateService = createAsyncThunk('UPDATE_SERVICE', (id) => {
  return axios
    .put(`/api/service/${id}`)
    .then(({ data }) => data)
    .catch((e) => console.log('ERROR', e));
});

const initialState = {
  services: [],
  created: '',
  singleService: {},
};

const service = createReducer(initialState, {
  [createService.fulfilled]: (state, action) => {
    if (action.payload) return { ...state, created: 'yes', singleService: action.payload };
    else return { ...state, created: 'no' };
  },
  [createService.pending]: (state) => {
    return { ...state, created: '' };
  },
  [fetchServices.fulfilled]: (state, action) => {
    return { ...state, services: action.payload };
  },
  /*   [updateService.fulfilled]: (state, action) => {
    return { ...state, services: state.services.filter((service) => service._id != action.payload._id) };
  }, */
});

export default service;
