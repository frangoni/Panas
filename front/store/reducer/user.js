import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('LOGIN', data => {
  return axios
    .post('/api/user/login/', data)
    .then(({ data }) => data)
    .catch(e => e);
});

export const fetchMe = createAsyncThunk('FETCH_ME', () => {
  return axios
    .get('/api/user/me')
    .then(({ data }) => data)
    .catch(e => e);
});

export const logout = createAsyncThunk('LOGOUT', data => {
  return axios
    .post('/api/user/logout')
    .then(({ data }) => data)
    .catch(e => e);
});

const initialState = {
  user: {},
  didLogin: '',
};

const user = createReducer(initialState, {
  [login.fulfilled]: (state, action) => {
    if (action.payload.rol) {
      return { ...state, user: action.payload, didLogin: 'yes' };
    } else return { ...state, didLogin: 'no' };
  },
  [login.pending]: state => {
    return { ...state, didLogin: '' };
  },
  [fetchMe.fulfilled]: (state, action) => {
    return { ...state, user: action.payload };
  },
  [logout.pending]: (state, action) => {
    return { ...state, didLogin: '' };
  },
  [logout.fulfilled]: (state, action) => {
    return { ...state, user: {} };
  },
});

export default user;
