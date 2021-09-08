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

export const getUsers = createAsyncThunk('GET_USERS', () => {
  return axios
    .get('/api/user')
    .then(({ data }) => data)
    .catch(e => e);
});

export const changePassword = createAsyncThunk('CHANGE_PASSWORD', data => {
  return axios
    .post('/api/user/change', data)
    .then(({ data }) => data)
    .catch(e => e);
});

const initialState = {
  user: {},
  users: [],
  didLogin: '',
  changed: '',
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
  [logout.pending]: state => {
    return { ...state, didLogin: '' };
  },
  [logout.fulfilled]: state => {
    return { ...state, user: {} };
  },
  [getUsers.fulfilled]: (state, action) => {
    return { ...state, users: action.payload };
  },
  [changePassword.fulfilled]: state => {
    return { ...state, changed: 'yes' };
  },
  [changePassword.pending]: state => {
    return { ...state, changed: '' };
  },
  [changePassword.rejected]: state => {
    return { ...state, changed: 'no' };
  },
});

export default user;
