import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const findMetrics = createAsyncThunk("FIND_METRICS", (checkinDate, parkingDate) => {
  return axios
    .get(`/api/service/metrics`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log("error", e));
});

/* ?checkinDate=${checkinDate}&parkingDate=${parkingDate} */

const initialState = {
  metrics: [],
};

const metrics = createReducer(initialState, {
  [findMetrics.fulfilled]: (state, action) => {
    return { ...state, metrics: action.payload };
  },
});

export default metrics;
