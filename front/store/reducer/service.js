import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createService = createAsyncThunk('CREATE_SERVICE', data => {
  return axios
    .post('/api/service', data)
    .then(({ data }) => data)
    .catch(e => e);
});

export const fetchServices = createAsyncThunk('FETCH_SERVICES', () => {
  return axios
    .get('/api/service')
    .then(({ data }) => data)
    .catch(e => e);
});

export const updateService = createAsyncThunk('UPDATE_SERVICE', id => {
  return axios
    .put(`/api/service/${id}`)
    .then(({ data }) => data)
    .catch(e => e);
});

export const getServicesByPlate = createAsyncThunk('GET_SERVICES_BY_PLATE', patente => {
  return axios
    .get(`/api/service/search/${patente}`)
    .then(({ data }) => data)
    .catch(e => e);
});

export const setPaid = createAsyncThunk('SET_PAID', data => {
  const { id, method } = data;
  return axios
    .put(`/api/service/caja/${id}/${method}`)
    .then(({ data }) => data)
    .catch(e => e);
});

const initialState = {
  services: [],
  created: '',
  singleService: {},
};

const service = createReducer(initialState, {
  [createService.fulfilled]: (state, action) => {
    if (action.payload.precio) return { ...state, created: 'yes', singleService: action.payload };
    else return { ...state, created: 'no' };
  },
  [createService.pending]: state => {
    return { ...state, created: '' };
  },
  [fetchServices.fulfilled]: (state, action) => {
    return { ...state, services: action.payload };
  },
  [getServicesByPlate.fulfilled]: (state, action) => {
    return { ...state, services: action.payload };
  },
});

export default service;
