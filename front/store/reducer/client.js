import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const findClient = createAsyncThunk("FIND_CLIENT", (patente) => {
  return axios
    .get(`/api/client/${patente}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log("error", e));
});
export const createService = createAsyncThunk("CREATE_SERVICE", (data) => {
  return axios
    .post("/api/service", data)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
});

const initialState = {
  client: {},
};

const service = createReducer(initialState, {
  [findClient.fulfilled]: (state, action) => {
    return { ...state, client: action.payload };
  },
});

export default service;
