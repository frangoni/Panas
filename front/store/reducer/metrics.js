import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const findMetrics = createAsyncThunk('FIND_METRICS', dates => {
  const { checkinDate, parkingDate } = dates;
  return axios
    .get(`/api/service/metrics?checkinDate=${checkinDate}&parkingDate=${parkingDate}`)
    .then(res => {
      return res.data;
    })
    .catch(e => e);
});

const initialState = {
  metrics: [],
};

const metrics = createReducer(initialState, {
  [findMetrics.fulfilled]: (state, action) => {
    return { ...state, metrics: action.payload };
  },
});

export default metrics;
